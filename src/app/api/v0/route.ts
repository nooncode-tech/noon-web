// /app/api/v0/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Asegúrate que este cliente funciona en el servidor
import { v0 } from "v0-sdk";

export async function POST(req: NextRequest) {
  try {
    // ✨ Recibimos el conversationId del frontend (como lo hicimos en el paso anterior)
    const { prompt, email, name, conversationId } = await req.json();
    if (!prompt || !email || !name || !conversationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data: existingProtos } = await supabase
      .from("prototypes")
      .select("chat_id, id") // También seleccionamos el ID de la tabla
      .eq("email", email)
      .limit(1);

    let v0ChatId = existingProtos?.[0]?.chat_id ?? undefined;
    // ✨ Guardamos el ID de nuestra base de datos si existe
    let prototypeId = existingProtos?.[0]?.id ?? undefined;
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
      const { data: newPrototype, error } = await supabase
        .from("prototypes")
        .insert({
          name,
          email,
          preview_url: demoUrl,
          chat_id: v0ChatId,
        })
        .select("id")
        .single();
        
      if (error) throw error;
      prototypeId = newPrototype.id; // Guardamos el nuevo ID

    } else {
      // Chat existente
      const reply = await v0.chats.sendMessage({ chatId: v0ChatId, message: prompt });
      demoUrl = reply.latestVersion?.demoUrl || reply.demo || "";
      
      await supabase
        .from("prototypes")
        .update({ preview_url: demoUrl })
        .eq("chat_id", v0ChatId);
    }

    // ✨ Devolvemos el ID de nuestra tabla 'prototypes'
    return NextResponse.json({
      success: true,
      prototype_id: prototypeId, // <-- La clave que el frontend necesita
    });

  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

