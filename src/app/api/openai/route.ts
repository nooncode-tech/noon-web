import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const companyPromptPath = path.join(process.cwd(), 'prompts', 'companyPrompt.txt')

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { prompt, conversationId } = body

        // 1. Prompt de la empresa
        const companyPrompt = fs.readFileSync(companyPromptPath, 'utf8')

        // 2. Historial de la conversación actual
        let messages: Array<{ role: 'user' | 'assistant', content: string }> = []
        if (conversationId) {
        const { data: msgs } = await supabase
            .from('messages')
            .select('role, content')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true })
        if (Array.isArray(msgs)) {
            for (const m of msgs) {
            if (m.role === 'user') messages.push({ role: 'user', content: m.content })
            if (m.role === 'bot') messages.push({ role: 'assistant', content: m.content })
            }
        }
        }

        // 3. Ejemplos de buenas conversaciones
        const { data: satConvs } = await supabase
        .from('conversations')
        .select('id')
        .gte('satisfaction', 4)
        .order('created_at', { ascending: false })
        .limit(3)

        let satisfactionExamples: string[] = []
        if (satConvs && satConvs.length > 0) {
        for (const conv of satConvs) {
            const { data: msgs } = await supabase
            .from('messages')
            .select('role, content')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: true })
            if (msgs && msgs.length) {
            // Puedes formatear como quieras, aquí simple
            satisfactionExamples.push(
                msgs.map(m => `${m.role === 'user' ? 'Usuario' : 'Bot'}: ${m.content}`).join('\n')
            )
            }
        }
        }

        // 4. Construir el contexto para el modelo
        // Comienza con el prompt de empresa y ejemplos de satisfacción
        let systemPrompt = companyPrompt
        if (satisfactionExamples.length > 0) {
        systemPrompt +=
            '\n\nEjemplos de buenas conversaciones anteriores:\n' +
            satisfactionExamples.join('\n---\n')
        }

        // 5. Armar el array de mensajes para OpenAI (primero el system, luego historial)
        const openaiMessages: any[] = [
        { role: 'system', content: systemPrompt },
        ...(messages ?? []),
        { role: 'user', content: prompt }
        ]

        // 6. Obtener respuesta de OpenAI
        const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // o "gpt-4"
        messages: openaiMessages
        })

        const reply = completion.choices[0]?.message?.content || 'No response'

        return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error(error)
        return new Response(
        JSON.stringify({ error: 'Error al generar respuesta' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}