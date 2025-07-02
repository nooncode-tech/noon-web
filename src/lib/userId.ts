import { v4 as uuidv4 } from 'uuid'

export function getUserId() {
    if (typeof window === "undefined") return ""
    let userId = localStorage.getItem("chat_user_id")
    if (!userId) {
        userId = uuidv4()
        localStorage.setItem("chat_user_id", userId)
    }
    return userId
}