import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { v0 } from "v0-sdk";

export async function POST(req: NextRequest) {
  try {
    const { prompt, email, name } = await req.json();
    if (!prompt || !email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Buscar si ya hay un prototipo para este usuario
    const { data: existingProtos } = await supabase
      .from("prototypes")
      .select("chat_id, id")
      .eq("email", email)
      .limit(1);

    let chatId = existingProtos?.[0]?.chat_id ?? undefined;
    let demoUrl = "";
    let v0ChatUrl = "";
    let result;

    if (!chatId) {
      // Chat nuevo
      result = await v0.chats.create({
        system:
          "You are an expert frontend developer specializing in crafting beautiful, modern, and highly detailed single-view landing pages. Every project you create must be a single-page landing (no multi-section or multi-page layouts). Always use the latest web technologies, libraries, and frameworks such as React, Next.js, Tailwind CSS, shadcn/ui, framer-motion, and Lucide or similar icon libraries. Ensure your designs are visually impressive, engaging, and highly interactive, incorporating smooth animations, appealing color schemes, and professional iconography. Write clean, well-structured, and accessible code. Focus on delivering visually striking, conversion-focused prototypes that impress clients and feel up to date with the latest design trends. Always provide code that is ready to use in a modern web project and easy to customize.",
        message: prompt,
        modelConfiguration: {
          modelId: "v0-1.5-sm",
          imageGenerations: false,
          thinking: false,
        },
      });
      chatId = result.id;
      demoUrl = result.latestVersion?.demoUrl || result.demo || "";
      v0ChatUrl = result.url || "";

      // Guardar nuevo prototipo en Supabase
      await supabase.from("prototypes").insert([
        {
          name,
          email,
          preview_url: demoUrl,
          chat_id: chatId,
        },
      ]);
    } else {
      // Chat existente: enviar mensaje usando el método correcto del SDK
      const reply = await v0.chats.sendMessage({
        chatId,
        message: prompt,
      });

      // El objeto `reply` puede tener la estructura del chat actualizado
      // Busca el demoUrl en la respuesta
      demoUrl = reply.latestVersion?.demoUrl || reply.demo || "";
      v0ChatUrl = reply.url || "";

      // Actualizar prototipo en supabase
      await supabase
        .from("prototypes")
        .update({ preview_url: demoUrl })
        .eq("chat_id", chatId);
    }

    return NextResponse.json({
      success: true,
      preview_url: demoUrl,
      chat_id: chatId,
      v0_chat_url: v0ChatUrl,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

