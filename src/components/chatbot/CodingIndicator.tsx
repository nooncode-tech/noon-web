import Image from "next/image";

const AnimatedDots = () => (
    <span>
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-150">.</span>
        <span className="animate-bounce delay-300">.</span>
    </span>
);

export const CodingIndicator = () => (
    <div className="flex gap-2 items-start mt-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center shadow-sm">
            <Image
                src="/base/maxwell-face.png"
                className="w-5 h-auto text-white transition-transform duration-300 group-hover:scale-110"
                width={20}
                height={20}
                alt="Chatbot Icon"
            />
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm flex flex-col items-start min-w-[180px]">
            <div className="flex gap-1 items-center mb-1">
                <span className="text-xs font-semibold text-[var(--principal-button-color)] tracking-wide uppercase">
                    Generating code
                </span>
                <span className="ml-1 animate-pulse text-[var(--principal-button-color)]">
                    <AnimatedDots />
                </span>
            </div>
            {/* Animated Skeleton Lines */}
            <div className="space-y-1 w-full">
                <div className="h-2 w-3/4 bg-gradient-to-r from-gray-200 via-[var(--principal-button-color)] to-gray-200 rounded animate-coding-bar"></div>
                <div className="h-2 w-1/2 bg-gradient-to-r from-gray-200 via-[var(--principal-button-color)] to-gray-200 rounded animate-coding-bar delay-150"></div>
                <div className="h-2 w-2/3 bg-gradient-to-r from-gray-200 via-[var(--principal-button-color)] to-gray-200 rounded animate-coding-bar delay-300"></div>
            </div>
            <style jsx global>
                {`
                    @keyframes coding-bar {
                        0% {
                        background-position: -200px 0;
                        }
                        100% {
                        background-position: calc(200px + 100%) 0;
                        }
                    }
                    .animate-coding-bar {
                        background-size: 200px 100%;
                        animation: coding-bar 1.2s linear infinite;
                    }
                `}
            </style>
        </div>
    </div>
);