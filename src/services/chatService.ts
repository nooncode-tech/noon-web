import { supabase } from "@/lib/supabaseClient";
import { Profile } from "@/types";

export const fetchOrCreateConversation = async (profile: Profile) => {
    const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("email", profile.email)
        .order("created_at", { ascending: false })
        .limit(1);

    if (existing && existing.length > 0) {
        return existing[0].id;
    }

    const { data: inserted } = await supabase
        .from("conversations")
        .insert([{ name: profile.name, email: profile.email }])
        .select("id")
        .single();

    return inserted?.id || null;
};

export const updateConversationSatisfaction = async (id: string, satisfaction: number) => {
    return await supabase
        .from("conversations")
        .update({ satisfaction })
        .eq("id", id);
};

export const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
        .from("messages")
        .select("role, content, image_url")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching messages:", error);
        return [];
    }

    return data || [];
};

export const saveMessage = async (
    conversationId: string,
    role: 'user' | 'bot' | 'system',
    content: string,
    imageUrl: string | null = null
) => {
    return await supabase
        .from("messages")
        .insert([{
            conversation_id: conversationId,
            role,
            content,
            image_url: imageUrl
        }]);
};

export const getBotResponse = async (
    prompt: string,
    conversationId: string,
    imageUrl: string | null = null // <-- 1. AÑADE EL NUEVO ARGUMENTO AQUÍ
) => {
    const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt,
            conversationId,
            imageUrl // <-- 2. AÑADE EL CAMPO AQUÍ
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to get response from OpenAI");
    }
    return await response.json();
};

export const createPrototype = async (prompt: string, profile: Profile, conversationId: string) => {
    const response = await fetch("/api/v0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt,
            email: profile.email,
            name: `Prototype by ${profile.name}`,
            conversationId,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create prototype");
    }
    return await response.json();
};