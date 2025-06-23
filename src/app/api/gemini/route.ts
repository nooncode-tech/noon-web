import { GoogleGenAI } from "@google/genai";
import type { NextRequest } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// Para manejar POST
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt } = body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const reply = response?.text || 'No response';

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
