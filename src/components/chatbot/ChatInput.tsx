import { useRef } from 'react';

// Definimos todas las props que el componente necesita desde el exterior
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
    const isEmpty = !userMessage?.trim

    const handleSendClick = () => {
        if (userMessage.trim() && !disabled && !loading) {
            onSend();
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
                        className={`
                        absolute left-1 top-1/2 -translate-y-1/2 z-20
                        p-2 rounded-lg
                        flex items-center justify-center
                        transition-colors duration-150
                        ${disabled || loading ? "opacity-40 pointer-events-none" : "hover:bg-white/6"}
                        bg-transparent text-white
                    `}
                    >
                        {/* clip icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    {/* Text input */}
                    <input
                        type="text"
                        placeholder="Type your question here..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
                        disabled={disabled || loading}
                        autoFocus={!isMobile}
                        className={`
                        w-full
                        px-10 pr-10 py-3
                        ${isMobile ? "text-base py-4" : "text-sm"}
                        rounded-2xl
                        border border-[var(--secondary-border-color)]
                        bg-[var(--input-bg,rgba(255,255,255,0.03))]
                        text-white placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-shadow duration-200
                        shadow-sm
                    `}
                    />

                    {/* Clear button inside input (to the left of send button) */}
                    {!isEmpty && (
                        <button
                            type="button"
                            onClick={() => setUserMessage("")}
                            aria-label="Clear input"
                            title="Clear"
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/6 transition-colors"
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
                    flex items-center justify-center
                    ${isMobile ? "w-14 h-14" : "w-12 h-12"}
                    rounded-2xl
                    transition-all duration-200 transform
                    ${disabled || loading || isEmpty
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            : "bg-[var(--principal-button-color)] text-white hover:shadow-xl hover:scale-105 active:scale-95"}
                    `}
                    aria-label="Send message"
                    title="Send"
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