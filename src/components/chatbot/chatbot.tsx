"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const ChatWidget = () => {
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState("")
    const [responses, setResponses] = useState<{ question: string; answer: string }[]>([])
    const [loading, setLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile on mount and on resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Bloquear scroll del body cuando el chat está abierto en móvil
    useEffect(() => {
        if (isMobile && open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobile, open])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [responses, isTyping])

    useEffect(() => {
        if (open && responses.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
        }
    }, [open])

    const handleSend = async () => {
        if (!question.trim()) return

        const currentQuestion = question
        setQuestion("")
        setLoading(true)

        setResponses((prev) => [...prev, { question: currentQuestion, answer: "" }])

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
                body: JSON.stringify({ prompt: currentQuestion }),
            })
            const data = await res.json()

            setTimeout(() => {
                setResponses((prev) =>
                    prev.map((item, index) => (index === prev.length - 1 ? { ...item, answer: data.reply } : item)),
                )
                setIsTyping(false)
            }, 1000)
        } catch (error) {
            console.error("Error al enviar la pregunta:", error)
            setResponses((prev) =>
                prev.map((item, index) =>
                    index === prev.length - 1 ? { ...item, answer: "Lo siento, ocurrió un error. Inténtalo de nuevo." } : item,
                ),
            )
            setIsTyping(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const TypingIndicator = () => (
        <div className="flex gap-2 items-start mt-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    )

    // Botón flotante
    if (!open) {
        return (
            <div className="fixed bottom-6 right-6 z-50 sm:bottom-6 sm:right-6">
                <button
                    className="group relative bg-gradient-to-br from-[var(--principal-background-color)] via-[var(--principal-button-color)] to-indigo-600 shadow-2xl rounded-full w-20 h-20 flex items-center justify-center hover:shadow-3xl transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    onClick={() => setOpen(true)}
                    aria-label="Abrir chat de IA"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
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
                background: 'rgba(0,0,0,0.05)' // fondo suave para distinguir
            } : {}}
        >
            <div className={`relative flex flex-col ${isMobile ? "h-full w-full" : "p-4"}`}>
                <div
                    className={`
                        flex flex-col bg-white shadow-2xl border border-gray-100 backdrop-blur-sm
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
                        relative px-6 py-5 bg-gradient-to-r from-[var(--principal-background-color)] via-[var(--principal-button-color)] to-indigo-600
                        ${isMobile ? "" : "rounded-t-3xl"}
                        flex-shrink-0
                    `}>
                        <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent ${isMobile ? "" : "rounded-t-3xl"}`}></div>
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

                    {/* Chat history */}
                    <div
                        className={`
                            flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white custom-scrollbar
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
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--principal-background-color)] via-[var(--principal-button-color)] flex items-center justify-center">
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
                                {/* Pregunta del usuario */}
                                <div className="flex gap-3 items-start justify-end">
                                    <div className="rounded-2xl bg-gradient-to-r from-[var(--principal-background-color)] to-[var(--principal-button-color)] px-4 py-3 text-white text-sm max-w-[80%] shadow-lg">
                                        {res.question}
                                    </div>
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--principal-background-color)] to-[var(--principal-button-color)] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a4 4 0 100 8 4 4 0 000-8zm-6 14a6 6 0 1112 0H4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Respuesta del bot */}
                                {res.answer && (
                                    <div className="flex gap-3 items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-sm">
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

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className={`
                        px-5 py-4 border-t border-gray-100 bg-white
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
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className={`
                                        w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        bg-gray-50 placeholder:text-gray-400 text-sm transition-all duration-200 pr-12
                                        ${isMobile ? "text-base py-4" : ""}
                                    `}
                                    disabled={loading || isTyping}
                                    onKeyDown={(e) => e.key === "Enter" && !loading && !isTyping && handleSend()}
                                    autoFocus={!isMobile}
                                    inputMode="text"
                                />
                                {question.trim() && (
                                    <button
                                        onClick={() => setQuestion("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={loading || isTyping || !question.trim()}
                                className={`
                                    p-3 rounded-2xl font-medium transition-all duration-200 shadow-lg
                                    ${loading || isTyping || !question.trim()
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-[var(--principal-background-color)] to-[var(--principal-button-color)] text-white hover:shadow-xl hover:scale-105 active:scale-95"
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
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWidget
