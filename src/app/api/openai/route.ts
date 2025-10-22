import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const companyPromptPath = path.join(
  process.cwd(),
  "prompts",
  "companyPrompt.txt",
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { prompt, conversationId, imageUrl } = body; 

    if (!prompt && !imageUrl) {
        return NextResponse.json({ error: "No prompt or image URL provided" }, { status: 400 });
    }

    const companyPrompt = fs.readFileSync(companyPromptPath, "utf8");

    let messages: Array<{ role: "user" | "assistant"; content: any }> = [];
    if (conversationId) {
      const { data: msgs, error: historyError } = await supabase
        .from("messages")
        .select("role, content, image_url")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (historyError) {
        console.error("Supabase history error:", historyError);
      }

      if (Array.isArray(msgs)) {
        for (const m of msgs) {
          let content: any;
          if (m.role === "user") {
            if (m.image_url && m.content) {
              content = [
                { type: "text", text: m.content },
                { type: "image_url", image_url: { url: m.image_url } },
              ];
            } else if (m.image_url) {
              content = [{ type: "image_url", image_url: { url: m.image_url } }];
            } else {
              content = m.content;
            }
            messages.push({ role: "user", content: content });
          } else if (m.role === "bot") {
            messages.push({ role: "assistant", content: m.content });
          }
        }
      }
    }

    let systemPrompt = companyPrompt;

    let finalUserContent: any;
    if (imageUrl && prompt) {
      finalUserContent = [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: imageUrl } },
      ];
    } else if (imageUrl) {
      finalUserContent = [{ type: "image_url", image_url: { url: imageUrl } }];
    } else {
      finalUserContent = prompt;
    }

    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...messages,
      { role: "user", content: finalUserContent },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      // Optional: Increase max_tokens if you expect longer descriptions of images
      // max_tokens: 1000 
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I could not process that.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("OpenAI API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Error generating response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
