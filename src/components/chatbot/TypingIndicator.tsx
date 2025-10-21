import Image from "next/image";

export const TypingIndicator = () => (
    <div className="flex gap-2 items-start mt-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center shadow-sm">
            <Image
                src="/base/maxwell-face.png"
                className="w-5 h-auto"
                width={20}
                height={20}
                alt="Chatbot Icon"
            />
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex space-x-1">
                <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                ></div>
                <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                ></div>
                <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                ></div>
            </div>
        </div>
    </div>
);