// /app/api/v0/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'; 
import { v0 } from "v0-sdk";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_PROTOTYPES_ITERATIONS = 3;
const LIMIT_REACHED_MESSAGE = "You have reached the maximum number of prototype modifications (3) for this conversation. Please contact an agent to discuss further changes.";

export async function POST(req: NextRequest) {
  try {
    const { prompt, email, name, conversationId } = await req.json();

    if (!prompt || !email || !name || !conversationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data: existingProto, error: fetchError } = await supabase
      .from("prototypes")
      .select("id, chat_id, prototype_count")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(); 

    if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
        throw new Error(`Supabase fetch error: ${fetchError.message}`); 
    }

    const currentCount = existingProto?.prototype_count ?? 0;
    if (currentCount >= MAX_PROTOTYPES_ITERATIONS) {
      return NextResponse.json({
        limitReached: true,
        message: LIMIT_REACHED_MESSAGE,
      });
    }

    let v0ChatId = existingProto?.chat_id; 
    let prototypeId = existingProto?.id;
    let nextCount = currentCount + 1;
    let demoUrl = "";

    if (!v0ChatId) {
      // Chat nuevo
      const result = await v0.chats.create({ system:
          "You are an expert frontend developer specializing in crafting beautiful, modern, and highly detailed single-view landing pages. Every project you create must be a single-page landing (no multi-section or multi-page layouts). Always use the latest web technologies, libraries, and frameworks such as React, Next.js, Tailwind CSS, shadcn/ui, framer-motion, and Lucide or similar icon libraries. Ensure your designs are visually impressive, engaging, and highly interactive, incorporating smooth animations, appealing color schemes, and professional iconography. Write clean, well-structured, and accessible code. Focus on delivering visually striking, conversion-focused prototypes that impress clients and feel up to date with the latest design trends. Always provide code that is ready to use in a modern web project and easy to customize.",
          message: prompt,
          modelConfiguration: {
            modelId: "v0-1.5-sm",
            imageGenerations: false,
            thinking: false,
          },
      });
      v0ChatId = result.id;
      demoUrl = result.latestVersion?.demoUrl || result.demo || "";

      // ✨ Al insertar, le pedimos a Supabase que nos devuelva el 'id' de la nueva fila
      const { data: newPrototype, error: insertError } = await supabase
        .from("prototypes")
        .insert({
          name,
          email,
          preview_url: demoUrl,
          chat_id: v0ChatId,
          conversation_id: conversationId,
          prototype_count: nextCount,
        })
        .select("id")
        .single();
        
      if (insertError) {
          console.error("Supabase insert error:", insertError);
          throw new Error(`Supabase insert error: ${insertError.message}`);
      }
      prototypeId = newPrototype.id;

    } else {
      const reply = await v0.chats.sendMessage({ chatId: v0ChatId, message: prompt });
      demoUrl = reply.latestVersion?.demoUrl || reply.demo || "";

      const { error: updateError } = await supabase
        .from("prototypes")
        .update({ 
            preview_url: demoUrl,
            prototype_count: nextCount,
        })
        .eq("id", prototypeId);

      if (updateError) {
          console.error("Supabase update error:", updateError);
          throw new Error(`Supabase update error: ${updateError.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      prototype_id: prototypeId,  
      prototype_count: nextCount, 
    });

  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "An internal server error occurred processing the prototype request." },
      { status: 500 },
    );
  }
}

