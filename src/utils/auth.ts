import { Profile } from "@/types";

export interface ChatSession {
  profile: Profile;
  conversationId: string;
}

const SESSION_KEY = 'chat_session';

export const getChatSession = (): ChatSession | null => { 
  if (typeof window === 'undefined') return null;
  try { 
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch { 
    return null; 
  }
};

export const setChatSession = (session: ChatSession) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearChatSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
};

export const parseJwt = (token: string): { name: string, email: string } => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};