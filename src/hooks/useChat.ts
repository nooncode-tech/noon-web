import { useState, useEffect, useRef, useContext } from 'react';
import { ChatContext } from "@/context/ChatContext";
import { Message, Profile } from '@/types';
import * as session from '@/utils/auth';
import * as chatService from '@/services/chatService';

export const useChat = () => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [responses, setResponses] = useState<Message[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isCoding, setIsCoding] = useState(false);

    const [showContactAgent, setShowContactAgent] = useState(false);
    const [showSatisfactionInline, setShowSatisfactionInline] = useState(false);
    const [showSuggested, setShowSuggested] = useState(true);

    const { contextMessage } = useContext(ChatContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const existingSession = session.getChatSession();
        if (existingSession) {
            setProfile(existingSession.profile);
            setConversationId(existingSession.conversationId);
        }
    }, []);

    useEffect(() => {
        if (contextMessage && window.innerWidth > 640) {
            setOpen(true);
        }
    }, [contextMessage]);

    useEffect(() => {

        if (!open || !conversationId) return; 

        const loadMessages = async () => {
            setLoading(true);
            const msgs = await chatService.fetchMessages(conversationId);
            const mapped = msgs.reduce<Message[]>((acc, cur) => {
                if (cur.role === "user") acc.push({ question: cur.content, answer: "" });
                else if (cur.role === "bot" && acc.length > 0) acc[acc.length - 1].answer = cur.content;
                return acc;
            }, []);
            setResponses(mapped);
            setLoading(false);
        };
        
        loadMessages();
    }, [open, conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [responses, isTyping, isCoding, showContactAgent, showSatisfactionInline]);

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const userInfo = session.parseJwt(credentialResponse.credential);
        const newProfile = { name: userInfo.name, email: userInfo.email };
        setProfile(newProfile);
        
        const convId = await chatService.fetchOrCreateConversation(newProfile);
        if (convId) {
            setConversationId(convId);
            session.setChatSession({ profile: newProfile, conversationId: convId });
        }
    };

    const handleSend = async (message: string) => {

        if (!profile || !conversationId || !message.trim()) return;

        setLoading(true);
        setResponses(prev => [...prev, { question: message, answer: "" }]);
        await chatService.saveMessage(conversationId, 'user', message);

        setIsTyping(true);
        setLoading(false);
        
        try {
            const data = await chatService.getBotResponse(message, conversationId);

            const botAnswer = data.reply
                .replace(/(?:'''|```)([\s\S]+?)(?:'''|```)/gi, "")
                .replace(/\[(END_CHAT|ADD_PROTOTYPE|TALK_WITH_AGENT)\]/gi, "")
                .trim();
            
            await chatService.saveMessage(conversationId, 'bot', botAnswer);
            
            // Actualiza la UI
            setIsTyping(false);
            setResponses(prev => prev.map((item, i) => i === prev.length - 1 ? { ...item, answer: botAnswer } : item));

            // Manejar comandos especiales
            if (/\[TALK_WITH_AGENT\]/gi.test(data.reply)) setShowContactAgent(true);
            if (/\[END_CHAT\]/gi.test(data.reply)) setShowSatisfactionInline(true);
            if (/\[ADD_PROTOTYPE\]/gi.test(data.reply)) {
                const match = /(?:'''|```)([\s\S]+?)(?:'''|```)/i.exec(data.reply);
                if (match?.[1]) handlePrototypeSave(match[1].trim());
            }

        } catch (error) {
            console.error(error);
            const errorMessage = "Lo siento, ocurrió un error. Inténtalo de nuevo.";
            setResponses(prev => prev.map((item, i) => i === prev.length - 1 ? { ...item, answer: errorMessage } : item));
            setIsTyping(false);
        }
    };
    
    const handlePrototypeSave = async (prompt: string) => {
        if (!profile || !conversationId) return;

        setIsCoding(true);
        try {
            const v0data = await chatService.createPrototype(prompt, profile, conversationId);
            
            let protoMsg = '';
            // Verificamos que la API devolvió el 'prototype_id' que ajustamos en el paso 1
            if (v0data && v0data.prototype_id) {
                // Construimos la URL LOCAL usando el ID de nuestra base de datos
                protoMsg = `✅ Prototype created! Preview it here: /prototype/${v0data.prototype_id}`;
            } else {
                // Si no viene el ID, lanzamos un error
                throw new Error("API did not return a valid prototype_id");
            }
            
            setResponses(prev => [...prev, { question: "", answer: protoMsg }]);
            await chatService.saveMessage(conversationId, 'bot', protoMsg);
        } catch (error) {
            console.error(error);
            const errorMsg = `❌ Error creating prototype. Please try again.`;
            setResponses(prev => [...prev, { question: "", answer: errorMsg }]);
            await chatService.saveMessage(conversationId, 'bot', errorMsg);
        } finally {
            setIsCoding(false);
        }
    };
    
    const handleClose = () => {
        setOpen(false);
        // Opcional: resetear estado para la próxima vez que se abra
        // setResponses([]);
        // setConversationId(null);
    };

    return {
        // Estado
        open,
        profile,
        conversationId,
        responses,
        loading,
        isTyping,
        isCoding,
        showContactAgent,
        showSatisfactionInline,
        contextMessage,
        messagesEndRef,
        showSuggested,
        // Funciones
        setOpen,
        handleClose,
        handleGoogleSuccess,
        handleSend,
        setShowSatisfactionInline,
        setShowSuggested,
    };
};