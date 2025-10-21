import { useState, useEffect } from "react";
import Image from "next/image";

interface FloatingButtonProps {
    onClick: () => void;
}

export const FloatingButton = ({ onClick }: FloatingButtonProps) => {
    const [bubbleVisible, setBubbleVisible] = useState(false);

    // Efecto para mostrar y ocultar la burbuja de notificación
    useEffect(() => {
        let initialTimeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        const showBubble = () => {
            setBubbleVisible(true);
            setTimeout(() => setBubbleVisible(false), 7000); // La burbuja dura 7 segundos
        };

        // Mostrar la primera vez tras 2 segundos
        initialTimeout = setTimeout(showBubble, 2000);
        // Luego, mostrar cada 25 segundos
        interval = setInterval(showBubble, 25000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Burbuja animada */}
            {bubbleVisible && (
                <div className="mb-2 animate-fade-in-out bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-lg text-gray-700 text-sm flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center">
                        <Image
                            src="/base/maxwell-face.png"
                            className="w-5 h-auto"
                            width={20}
                            height={20}
                            alt="Chatbot Icon"
                        />
                    </div>
                    <span>Chat with me!</span>
                </div>
            )}

            {/* Botón de abrir chat */}
            <button
                className="group relative bg-[var(--principal-button-color)] rounded-sm w-18 h-18 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                onClick={onClick}
                aria-label="Open AI Chat"
            >
                <div className="absolute inset-0 rounded-sm bg-blue-400 animate-ping opacity-20"></div>
                <svg
                    className="w-12 h-12 text-white relative"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};