import { supabase } from "@/lib/supabaseClient";
import { Profile } from "@/types";

export const fetchOrCreateConversation = async (profile: Profile) => {
    const { data: inserted, error } = await supabase
        .from("conversations")
        .insert([{ 
            name: profile.name, 
            email: profile.email 
        }])
        .select("id")
        .single();

    if (error) {
        console.error("Error creating new conversation:", error);
        return null;
    }

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
        throw new Error(`Supabase error: ${error.message}`);
    }

    return data || [];
};

export const saveMessage = async (
        conversationId: string,
        role: 'user' | 'bot' | 'system',
        content: string,
        imageUrl: string | null = null
    ) => {
    const { data, error } = await supabase
        .from("messages")
        .insert([{
            conversation_id: conversationId,
            role,
            content,
            image_url: imageUrl
        }])
        .select();

    if (error) {
        console.error("Supabase error saving message:", error);
        throw new Error(error.message);
    }

    return data;
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

export const getPrototypeCount = async (conversationId: string): Promise<number> => {
    if (!conversationId) return 0;

    try {
        const { data, error, count } = await supabase
            .from("prototypes")
            .select("prototype_count", { count: 'exact', head: true })
            .eq("conversation_id", conversationId);

        if (error) {
            console.error("Error fetching prototype count:", error);
            return 0;
        }

        return count ?? 0;

    } catch (err) {
        console.error("Unexpected error fetching prototype count:", err);
        return 0;
    }
};

export const checkConversationExistence = async (conversationId: string): Promise<boolean> => {
    const { count, error } = await supabase
        .from("conversations")
        .select("id", { count: 'exact', head: true })
        .eq("id", conversationId);
        
    if (error) {
        console.error("Error checking conversation existence:", error);
        throw new Error(error.message); 
    }
    
    return (count ?? 0) > 0;
};