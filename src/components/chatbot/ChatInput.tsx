import { useRef, useEffect } from 'react';

// Definimos todas las props
interface ChatInputProps {
    onSend: () => void;
    userMessage: string;
    setUserMessage: (message: string) => void;
    disabled: boolean;
    loading: boolean;
    isMobile: boolean;
    profile: object | null;
    showSuggested: boolean;
    onHideSuggested: () => void;
    imagePreview: string | null;
    setImagePreview: (url: string | null) => void;
    setFileToUpload: (file: File | null) => void;
}

const SUGGESTED_MESSAGE = "I need help";

export const ChatInput = ({ onSend, userMessage, setUserMessage, imagePreview, setImagePreview, setFileToUpload, disabled, loading, isMobile, profile, showSuggested, onHideSuggested }: ChatInputProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    // Referencia para el textarea para controlar su altura
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    
    // Corrección: añadimos paréntesis a trim()
    const isEmpty = !userMessage?.trim(); 

    // Efecto para auto-ajustar la altura del textarea
    useEffect(() => {
        if (textareaRef.current) {
            // Reseteamos la altura para calcular correctamente al borrar texto
            textareaRef.current.style.height = 'auto';
            // Ajustamos a la altura del contenido (scrollHeight)
            // Limitamos la altura máxima a, por ejemplo, 120px o 150px para que no ocupe toda la pantalla
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`;
        }
    }, [userMessage]);

    const handleSendClick = () => {
        if (userMessage.trim() && !disabled && !loading) {
            onSend();
            // Resetear altura tras enviar
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        }
    };

    // Manejo del Enter en el textarea
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Evitar salto de línea
            handleSendClick();
        }
    };

    const handleSuggestedClick = () => {
        setUserMessage(SUGGESTED_MESSAGE);
        onHideSuggested();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileToUpload(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFileToUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div
            className={`
            px-5 pt-2 pb-4 border-t border-[var(--secondary-border-color)] bg-[var(--principal-background-color)]
            ${isMobile ? "rounded-none sticky bottom-0 w-full flex-shrink-0" : "rounded-b-3xl"} 
            `}
        >
            {/* Botón de Mensaje Sugerido */}
            {profile && showSuggested && (
                <div className="flex items-center gap-1 mb-1">
                    <button
                        className="bg-white/80 text-sm border border-gray-200 text-[var(--principal-button-color)] font-semibold px-3 py-1 rounded-2xl shadow hover:bg-white transition-colors duration-150"
                        onClick={handleSuggestedClick}
                        type="button"
                    >
                        {SUGGESTED_MESSAGE}
                    </button>
                </div>
            )}

            {imagePreview && (
                <div className="relative p-2 w-[fit] inline-block">
                    <img src={imagePreview} alt="Preview" className="h-20 w-auto rounded-md border border-gray-300" />
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                        aria-label="Remove image"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Campo de texto y botón de enviar */}
            <div className="flex gap-3 items-end">
                <div className="flex-grow relative">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Attach button inside the input (left) */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || loading}
                        aria-label="Attach image"
                        title="Attach image"
                        // Cambiamos top-1/2 a bottom-3 para que si el input crece, el clip se quede abajo alineado
                        className={`
                        absolute left-1 bottom-2 z-20
                        p-2 rounded-lg
                        flex items-center justify-center
                        transition-colors duration-150
                        ${disabled || loading ? "opacity-40 pointer-events-none" : "hover:bg-white/6"}
                        bg-transparent text-white
                        `}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    <textarea
                        ref={textareaRef}
                        placeholder="Type your question here..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled || loading}
                        autoFocus={!isMobile}
                        rows={1}
                        className={`
                        block w-full
                        px-10 py-3
                        text-base 
                        ${!isMobile && "md:text-[13px]"} 
                        rounded-2xl
                        border border-[var(--secondary-border-color)]
                        bg-[var(--input-bg,rgba(255,255,255,0.03))]
                        text-white placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-shadow duration-200
                        shadow-sm
                        resize-none
                        overflow-hidden
                        leading-normal
                        `}
                        style={{
                            minHeight: '48px', // Altura base similar a tu input anterior
                            maxHeight: '150px' // Límite para que aparezca scroll
                        }}
                    />

                    {/* Clear button */}
                    {!isEmpty && (
                        <button
                            type="button"
                            onClick={() => {
                                setUserMessage("");
                                // Forzar el reseteo de altura inmediatamente
                                if(textareaRef.current) textareaRef.current.style.height = 'auto';
                            }}
                            aria-label="Clear input"
                            title="Clear"
                            // Alineado abajo también (bottom-3)
                            className="absolute right-1 bottom-2 z-20 p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/6 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Send button */}
                <button
                    onClick={handleSendClick}
                    disabled={disabled || loading || isEmpty}
                    className={`
                    flex items-center justify-center flex-shrink-0
                    ${isMobile ? "w-12 h-12" : "w-12 h-12"}
                    h-12 w-12
                    rounded-2xl
                    transition-all duration-200 transform
                    ${disabled || loading || isEmpty
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            : "bg-[var(--principal-button-color)] text-white hover:shadow-xl hover:scale-105 active:scale-95"}
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