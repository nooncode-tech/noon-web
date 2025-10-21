// /components/chatbot/ChatInput.tsx
import { useState, useEffect } from 'react';

// Definimos todas las props que el componente necesita desde el exterior
interface ChatInputProps {
    onSend: (message: string) => void;
    disabled: boolean;
    loading: boolean;
    isMobile: boolean;
    profile: object | null; // Usamos profile para saber si mostrar el mensaje sugerido
    showSuggested: boolean;
    onHideSuggested: () => void; // Función para ocultar el mensaje sugerido en el padre
}

const SUGGESTED_MESSAGE = "I need help";

export const ChatInput = ({ onSend, disabled, loading, isMobile, profile, showSuggested, onHideSuggested }: ChatInputProps) => {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
        if (message.trim() && !disabled && !loading) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleSuggestedClick = () => {
        setMessage(SUGGESTED_MESSAGE);
        onHideSuggested(); // Llama a la función del padre para que actualice su estado
    };

    return (
        <div
            className={`
        px-5 py-4 border-t border-[var(--secondary-border-color)] bg-[var(--principal-background-color)]
        ${isMobile ? "rounded-none sticky bottom-0 w-full flex-shrink-0" : "rounded-b-3xl"} 
        `}
        >
            {/* Botón de Mensaje Sugerido */}
            {profile && showSuggested && (
                <div className="flex items-center gap-2 mb-3">
                    <button
                        className="bg-white/80 border border-gray-200 text-[var(--principal-button-color)] font-semibold px-4 py-2 rounded-2xl shadow hover:bg-white transition-colors duration-150"
                        onClick={handleSuggestedClick}
                        type="button"
                    >
                        {SUGGESTED_MESSAGE}
                    </button>
                </div>
            )}

            {/* Campo de texto y botón de enviar */}
            <div className="flex gap-3 items-end">
                <div className="flex-grow relative">
                    <input
                        type="text"
                        placeholder="Type your question here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
                        disabled={disabled || loading}
                        autoFocus={!isMobile}
                        className={`
                            w-full px-4 py-3 rounded-2xl border border-[var(--secondary-border-color)] 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            placeholder:text-gray-400 text-sm text-white bg-transparent transition-all duration-200 pr-10
                            ${isMobile ? "text-base py-4" : ""}
                        `}
                    />
                    {/* Botón para limpiar el input */}
                    {message.trim() && (
                        <button
                            onClick={() => setMessage('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Clear input"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Botón de Enviar (con estado de carga) */}
                <button
                    onClick={handleSendClick}
                    disabled={disabled || loading || !message.trim()}
                    className={`
                            p-3 rounded-2xl font-medium transition-all duration-200 shadow-lg
                            ${disabled || loading || !message.trim()
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[var(--principal-button-color)] text-white hover:shadow-xl hover:scale-105 active:scale-95"
                            }
                                ${isMobile ? "py-4 px-4" : ""}
                            `}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <g transform="rotate(90 12 12)">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </g>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};