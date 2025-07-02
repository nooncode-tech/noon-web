import { OpenAI } from "openai";
import type { NextRequest } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Para manejar POST
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt } = body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Puedes cambiar a "gpt-4" si tienes acceso
            messages: [
                { role: "user", content: prompt }
            ],
        });

        const reply = completion.choices[0]?.message?.content || 'No response';

        return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error al generar respuesta' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}