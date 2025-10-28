// /context/ChatContext.tsx
"use client";

import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

export interface ChatContextType {
  contextMessage: string;
  setContextMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [contextMessage, setContextMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ contextMessage, setContextMessage, open, setOpen }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext debe usarse dentro de un ChatProvider');
  }
  return context;
};