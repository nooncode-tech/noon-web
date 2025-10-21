// /components/chatbot/ChatHeader.tsx
import Image from "next/image";
import { useIsMobile } from '@/hooks/useIsMobile';

interface ChatHeaderProps {
    onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
    const isMobile = useIsMobile();

    return (
        <div className="relative flex-shrink-0 px-6 py-5 bg-[var(--principal-background-color)] rounded-t-3xl">
            {/* Botón de cerrar */}
            <button
                className={`absolute ${isMobile ? "top-4 right-4" : "-top-2 -right-2"} 
                        bg-white border-2 border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg 
                        hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 z-10 group`}
                onClick={onClose}
                aria-label="Cerrar chat"
            >
                <svg
                    className="w-5 h-5 transition-transform group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Contenido del Header */}
            <div className={`absolute inset-0 bg-gray-800/30 ${isMobile ? "" : "rounded-t-3xl"}`}></div>
            <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center items-center before:content-[''] before:bg-green-500 before:w-3 before:h-3 before:absolute before:bottom-0 before:right-0 before:rounded-full">
                    <Image
                        src="/base/maxwell-face.png"
                        className="w-8 h-auto text-white transition-transform duration-300 group-hover:scale-110"
                        width={20}
                        height={20}
                        alt="Chatbot Icon"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">Maxwell Aldridge</h2>
                    <p className="text-white/80 text-sm">Always here to help you</p>
                </div>
            </div>
        </div>
    );
};