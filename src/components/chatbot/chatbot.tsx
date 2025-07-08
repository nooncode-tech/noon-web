"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

type Message = {
    question: string
    answer: string
}

const SatisfactionInline = ({
    conversationId,
    onDone,
}: {
    conversationId: string
    onDone: () => void
}) => {
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<number | null>(null)
    const [endedAt] = useState(new Date())

    const handleVote = async (score: number) => {
        setLoading(true)
        setSelected(score)
        await supabase
            .from("conversations")
            .update({ satisfaction: score })
            .eq("id", conversationId)
        setLoading(false)
        setTimeout(onDone, 800)
    }

    return (
        <div className="flex flex-col items-center w-full py-5">
            <div className="bg-white w-full sm:max-w-md px-4 py-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                <p className="font-semibold text-gray-700 text-sm mb-2">
                    How helpful was this conversation? <span className="text-xs text-gray-400">(optional)</span>
                </p>
                <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            type="button"
                            aria-label={`Rate ${n} stars`}
                            className={`
                                text-lg px-1 transition-colors
                                ${selected === n
                                                    ? "text-yellow-400 scale-110"
                                                    : "text-gray-300 hover:text-yellow-400"
                                                }
                            `}
                            key={n}
                            onClick={() => handleVote(n)}
                            disabled={loading || selected !== null}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 mb-1">1 = Not helpful, 5 = Very helpful</div>
                {loading && <span className="text-xs text-gray-400 mt-2">Saving...</span>}
                {selected !== null && !loading && (
                    <span className="text-xs text-green-600 mt-2">Thank you for your feedback!</span>
                )}
            </div>
            {/* Divider with chat ended info */}
            <div className="relative flex items-center w-full my-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-3 text-xs text-gray-400 bg-white px-2 py-1 rounded-full shadow-sm">
                    Chat Ended · {endedAt.toLocaleString()}
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
        </div>
    )
}

const getLocalUser = () => {
    if (typeof window === "undefined") return null
    try {
        const data = localStorage.getItem("chat_profile")
        return data ? JSON.parse(data) : null
    } catch {
        return null
    }
}

const setLocalUser = (profile: { name: string; email: string }) => {
    if (typeof window === "undefined") return
    localStorage.setItem("chat_profile", JSON.stringify(profile))
}

const ChatWidget = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<"form" | "chat">("form")
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [responses, setResponses] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [conversationId, setConversationId] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showSatisfactionInline, setShowSatisfactionInline] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [profile, setProfile] = useState<{ name: string; email: string } | null>(null)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Block scroll when open in mobile
    useEffect(() => {
        if (isMobile && open) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        return () => { document.body.style.overflow = "" }
    }, [isMobile, open])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [responses, isTyping, showSatisfactionInline])

    // Cargar perfil de usuario (localStorage)
    useEffect(() => {
        const local = getLocalUser()
        if (local && local.name && local.email) {
            setProfile(local)
            setForm((f) => ({ ...f, name: local.name, email: local.email }))
            setStep("chat")
        }
    }, [])

    // Cargar historial si el usuario ya existe
    useEffect(() => {
        if (open && profile && !conversationId) {
            (async () => {
                setLoading(true)
                const { data: existing } = await supabase
                    .from("conversations")
                    .select("id")
                    .eq("email", profile.email)
                    .order("created_at", { ascending: false })
                    .limit(1)
                let convId = existing?.[0]?.id
                if (convId) {
                    // Cargar historial
                    const { data: msgs } = await supabase
                        .from("messages")
                        .select("role, content")
                        .eq("conversation_id", convId)
                        .order("created_at", { ascending: true })
                    const mapped =
                        Array.isArray(msgs) && msgs.length > 0
                            ? msgs.reduce<Message[]>((acc, cur) => {
                                if (cur.role === "user") {
                                    acc.push({ question: cur.content, answer: "" })
                                } else if (cur.role === "bot" && acc.length > 0) {
                                    acc[acc.length - 1].answer = cur.content
                                }
                                return acc
                            }, [])
                            : []
                    setResponses(mapped)
                    setConversationId(convId)
                }
                setLoading(false)
            })()
        }
        // eslint-disable-next-line
    }, [open, profile])

    // Al enviar el formulario, crear conversación, guardar usuario en localStorage y enviar el primer mensaje (y obtener respuesta)
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setLocalUser({ name: form.name, email: form.email })
        setProfile({ name: form.name, email: form.email })

        // Buscar conversación existente por email
        const { data: existing } = await supabase
            .from("conversations")
            .select("id")
            .eq("email", form.email)
            .order("created_at", { ascending: false })
            .limit(1)
        let convId = existing?.[0]?.id
        if (!convId) {
            // Crear conversación y guardar el primer mensaje
            const { data: inserted } = await supabase
                .from("conversations")
                .insert([{ name: form.name, email: form.email }])
                .select("id")
                .single()
            convId = inserted?.id
        }
        setConversationId(convId)
        setStep("chat")
        setLoading(false)
        // Enviar primer mensaje como si fuera handleSend
        if (form.message) {
            await handleSend(form.message, convId)
            setForm((f) => ({ ...f, message: "" }))
        }
    }

    // Enviar mensaje y obtener respuesta del bot
    const handleSend = async (message?: string, convIdParam?: string | null) => {
        const msg = typeof message === "string" ? message : form.message
        const convId = convIdParam || conversationId
        if (!profile?.email || !convId || !msg) return

        setForm((f) => ({ ...f, message: "" }))
        setLoading(true)
        setResponses((prev) => [...prev, { question: msg, answer: "" }])

        // Guardar mensaje usuario en supabase
        await supabase.from("messages").insert([
            { conversation_id: convId, role: "user", content: msg },
        ])
        setTimeout(() => {
            setIsTyping(true)
            setLoading(false)
        }, 500)

        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: msg, conversationId: convId }),
            })
            const data = await res.json()
            const botAnswer = data.reply

            // Guardar respuesta bot en supabase
            await supabase.from("messages").insert([
                { conversation_id: convId, role: "bot", content: botAnswer },
            ])

            setTimeout(() => {
                setResponses((prev) =>
                    prev.map((item, index) =>
                        index === prev.length - 1 ? { ...item, answer: botAnswer } : item
                    )
                )
                setIsTyping(false)
                // Detectar si el bot pregunta si desea finalizar
                if (/\[END_CHAT\]/i.test(botAnswer)) {
                    const chatEndedMsg = `Chat Ended · ${new Date().toLocaleString()}`;
                    setResponses((prev) => [
                        ...prev,
                        { question: "", answer: chatEndedMsg }
                    ]);
                    // Usa una función async IIFE para poder usar await aquí:
                    (async () => {
                        await supabase.from("messages").insert([
                            {
                                conversation_id: convId,
                                role: "system",
                                content: chatEndedMsg,
                            }
                        ]);
                    })();
                    setShowSatisfactionInline(true);
                }
            }, 1000)
        } catch (error) {
            setResponses((prev) =>
                prev.map((item, index) =>
                    index === prev.length - 1
                        ? { ...item, answer: "Lo siento, ocurrió un error. Inténtalo de nuevo." }
                        : item
                )
            )
            setIsTyping(false)
        }
    }

    // Detectar "sí" o afirmativo del usuario para finalizar el chat y mostrar puntuación
    useEffect(() => {
        if (
            showSatisfactionInline &&
            responses.length > 0 &&
            conversationId
        ) {
            const lastUserMsg = responses[responses.length - 1]?.question?.toLowerCase() || ""
            if (
                /(sí|si|yes|finalizar|cerrar|terminar)/i.test(lastUserMsg)
            ) {
                setShowSatisfactionInline(false)
                setResponses((prev) => [
                    ...prev,
                    { question: "", answer: "¡Gracias por conversar con nosotros!" },
                ])
                // Insertar mensaje de agradecimiento del bot
                setTimeout(() => setShowSatisfactionInline(true), 500)
            }
        }
        // eslint-disable-next-line
    }, [responses, showSatisfactionInline])

    const handleClose = () => {
        setOpen(false)
        setShowSatisfactionInline(false)
        setStep(profile ? "chat" : "form")
        setForm({ ...form, message: "" })
        // NO limpiamos perfil, responses ni conversationId para persistencia
    }

    const TypingIndicator = () => (
        <div className="flex gap-2 items-start mt-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[var(--principal-button-color)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-[var(--principal-button-color)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-[var(--principal-button-color)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    )

    // Botón flotante
    if (!open) {
        return (
            <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6">
                <button
                    className="group relative bg-[var(--principal-button-color)] rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    onClick={() => setOpen(true)}
                    aria-label="Abrir chat de IA"
                >
                    <div className="absolute inset-0 rounded-full"></div>
                    <Image
                        src="/base/profesor.gif"
                        className="w-16 h-16 text-white transition-transform duration-300 group-hover:scale-110"
                        width={64}
                        height={64}
                        alt="Chatbot Icon"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                </button>
            </div>
        )
    }

    return (
        <div
            className={`
        fixed z-50
        ${isMobile
                    ? "inset-0 w-full h-full max-w-full max-h-full"
                    : "bottom-6 right-6 max-w-sm w-full"
                }
      `}
            style={isMobile ? {
                padding: 0,
                margin: 0,
                width: '100vw',
                height: '100dvh',
                maxWidth: '100vw',
                maxHeight: '100dvh',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.05)'
            } : {}}
        >
            <div className={`relative flex flex-col ${isMobile ? "h-full w-full" : "p-4"}`}>
                <div
                    className={`
                        flex flex-col shadow-2xl border border-[var(--secondary-border-color)] backdrop-blur-sm
                        ${isMobile
                                        ? "h-full w-full max-w-full max-h-full rounded-none"
                                        : "rounded-3xl"
                                    }
                    `}
                    style={isMobile ? {
                        height: '100dvh',
                        width: '100vw',
                        maxHeight: '100dvh',
                        maxWidth: '100vw',
                        overflow: 'hidden'
                    } : {}}
                >

                    {/* Botón de cerrar */}
                    <button
                        className={`absolute ${isMobile ? "top-4 right-4" : "-top-2 -right-2"} 
                        bg-white border-2 border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg 
                        hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 z-10 group`}
                        onClick={handleClose}
                        aria-label="Cerrar chat"
                    >
                        <svg
                            className="w-5 h-5 transition-transform group-hover:rotate-90"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className={`
                        relative px-6 py-5 bg-[var(--principal-background-color)]
                        ${isMobile ? "" : "rounded-t-3xl"}
                        flex-shrink-0
                    `}>
                        <div className={`absolute inset-0 bg-gray-800/30 ${isMobile ? "" : "rounded-t-3xl"}`}></div>
                        <div className="relative flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Profesor</h2>
                                <p className="text-white/80 text-sm">Always here to help you</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario dentro del widget */}
                    {step === "form" && (
                        <form
                            onSubmit={handleFormSubmit}
                            className="flex flex-col text-white gap-3 px-6 py-6 flex-1 bg-[var(--principal-background-color)] rounded-b-3xl"
                        >
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="border border-[var(--secondary-border-color)] px-3 py-2 rounded"
                                autoComplete="off"
                            />
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="border border-[var(--secondary-border-color)] px-3 py-2 rounded"
                                autoComplete="off"
                            />
                            <textarea
                                placeholder="¿En qué te puedo ayudar?"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                className="border border-[var(--secondary-border-color)] px-3 py-2 rounded"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
                            >
                                {loading ? "Cargando..." : "Comenzar chat"}
                            </button>
                        </form>
                    )}

                    {/* Chat normal */}
                    {step === "chat" && (
                        <>
                            {/* Chat history */}
                            <div
                                className={`
                                    flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[var(--principal-background-color)] custom-scrollbar
                                    ${isMobile
                                                            ? "max-h-none min-h-0"
                                                            : "max-h-80"
                                                        }
                                `}
                                style={isMobile ? {
                                    height: "1px",
                                    minHeight: 0,
                                    flexGrow: 1,
                                    overflowX: 'hidden'
                                } : { minHeight: 200, overflowX: 'hidden' }}
                            >
                                {responses.length === 0 && (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--principal-background-color)] flex items-center justify-center">
                                            <Image
                                                src="/base/profesor.gif"
                                                className="w-16 h-auto text-white transition-transform duration-300 group-hover:scale-110"
                                                width={64}
                                                height={64}
                                                alt="Chatbot Icon"
                                            />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium">Hello! How can I help you?</p>
                                        <p className="text-gray-400 text-xs mt-1">Type your question below</p>
                                    </div>
                                )}

                                {responses.map((res, index) => (
                                    <div key={index} className="space-y-3">
                                        {/* Pregunta usuario */}
                                        {res.question && (
                                            <div className="flex gap-3 items-start justify-end">
                                                <div className="rounded-2xl bg-[var(--principal-button-color)] px-4 py-3 text-white text-sm max-w-[80%] shadow-lg">
                                                    {res.question}
                                                </div>
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 2a4 4 0 100 8 4 4 0 000-8zm-6 14a6 6 0 1112 0H4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}

                                        {/* Respuesta bot */}
                                        {res.answer && (
                                            <div className="flex gap-3 items-start">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center shadow-sm">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="rounded-2xl bg-white border border-gray-200 px-4 py-3 text-gray-800 text-sm max-w-[80%] shadow-sm">
                                                    {res.answer}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Indicador de escritura */}
                                {isTyping && <TypingIndicator />}

                                {/* Puntuación de satisfacción inline */}
                                {showSatisfactionInline && conversationId && (
                                    <SatisfactionInline
                                        conversationId={conversationId}
                                        onDone={() => setShowSatisfactionInline(false)}
                                    />
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className={`
                                px-5 py-4 border-t border-[var(--secondary-border-color)] bg-[var(--principal-background-color)]
                                ${isMobile
                                    ? "rounded-none sticky bottom-0 w-full flex-shrink-0"
                                    : "rounded-b-3xl"
                                }
                                `}>
                                <div className="flex gap-3 items-end">
                                    <div className="flex-grow relative">
                                        <input
                                            type="text"
                                            placeholder="Type your question here..."
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            className={`
                                            w-full px-4 py-3 rounded-2xl border border-[var(--secondary-border-color)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            placeholder:text-gray-400 text-sm text-white transition-all duration-200 pr-12
                                            ${isMobile ? "text-base py-4" : ""}
                                            `}
                                            disabled={loading || isTyping || showSatisfactionInline}
                                            onKeyDown={(e) => e.key === "Enter" && !loading && !isTyping && !showSatisfactionInline && handleSend()}
                                            autoFocus={!isMobile}
                                            inputMode="text"
                                        />
                                        {form.message.trim() && (
                                            <button
                                                onClick={() => setForm({ ...form, message: "" })}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={loading || isTyping || !form.message.trim() || showSatisfactionInline}
                                        className={`
                                            p-3 rounded-2xl font-medium transition-all duration-200 shadow-lg
                                            ${loading || isTyping || !form.message.trim() || showSatisfactionInline
                                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                        : "bg-[var(--principal-button-color)] text-white hover:shadow-xl hover:scale-105 active:scale-95"
                                                                    }
                                            ${isMobile ? "text-base py-4 px-4" : ""}
                                        `}
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <g transform="rotate(90 12 12)">
                                                    <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </g>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatWidget
