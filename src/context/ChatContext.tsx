// /context/ChatContext.tsx
"use client";

import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

export interface ChatContextType {
  contextMessage: string;
  setContextMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imagePreview: string | null;
  setImagePreview: Dispatch<SetStateAction<string | null>>;
  fileToUpload: File | null;
  setFileToUpload: Dispatch<SetStateAction<File | null>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [contextMessage, setContextMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  return (
    <ChatContext.Provider value={{
      contextMessage,
      setContextMessage,
      open,
      setOpen,
      imagePreview,
      setImagePreview,
      fileToUpload,
      setFileToUpload,
    }}>
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