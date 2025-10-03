"use client";

import { ReactNode, createContext, useState } from "react";
export interface ChatContextType {
  /**
   * Envía un mensaje inicial o de "héroe" al chat.
   * @param message El contenido del mensaje a enviar.
   */
  handleHeroChatSend: (message: string) => void;
  contextMessage: string;
}

// creamos el contexto con un valor inicial
const ChatContext = createContext<ChatContextType>({
  contextMessage: "",
  handleHeroChatSend: () => {},
});

function ChatProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [contextMessage, setContextMessage] = useState("");
  function handleHeroChatSend(message: string) {
    setContextMessage(message);
  }

  const contextValue: ChatContextType = {
    handleHeroChatSend,
    contextMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
