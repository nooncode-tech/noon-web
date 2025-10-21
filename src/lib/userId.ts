import { v4 as uuidv4 } from "uuid";

export function getUserId() {
  if (typeof window === 'undefined') return null;
  const ls = window.localStorage;
  if (!ls || typeof ls.getItem !== 'function' || typeof ls.setItem !== 'function') return null;

  try {
    let userId = ls.getItem('chat_user_id');
    if (!userId) {
      userId = uuidv4();
      try { ls.setItem('chat_user_id', userId); } catch { /* ignore storage errors */ }
    }
    return userId;
  } catch {
    return null;
  }
}

