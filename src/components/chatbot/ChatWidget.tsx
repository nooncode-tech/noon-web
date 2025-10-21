"use client";

import { FloatingButton } from './FloatingButton';
import { ChatWindow } from './ChatWindow';
import { useChat } from '@/hooks/useChat';

const ChatWidget = () => {
    const chat = useChat();

    if (!chat.open) {

        return <FloatingButton onClick={() => chat.setOpen(true)} />;
    }

    return <ChatWindow chatState={chat} onClose={() => chat.setOpen(false)} />;
};

export default ChatWidget;