import { useState } from "react";
import { updateConversationSatisfaction } from "@/services/chatService";

interface SatisfactionInlineProps {
    conversationId: string;
    onDone: () => void;
}

export const SatisfactionInline = ({ conversationId, onDone }: SatisfactionInlineProps) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);

    const handleVote = async (score: number) => {
        setLoading(true);
        setSelected(score);
        try {
            await updateConversationSatisfaction(conversationId, score);
        } catch (error) {
            console.error("Failed to save satisfaction score:", error);
        }
        setLoading(false);
        setTimeout(onDone, 1200); // Espera un poco para que el usuario vea el agradecimiento
    };

    return (
        <div className="flex flex-col items-center w-full py-5">
            <div className="bg-white w-full sm:max-w-md px-4 py-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                <p className="font-semibold text-gray-700 text-sm mb-2">
                    How helpful was this conversation?{" "}
                    <span className="text-xs text-gray-400">(optional)</span>
                </p>
                <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            type="button"
                            key={n}
                            aria-label={`Rate ${n} stars`}
                            className={`text-2xl px-1 transition-transform duration-150
                ${selected !== null ? 'cursor-default' : 'hover:scale-125'}
                ${(selected !== null && selected >= n) ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`
                            }
                            onClick={() => handleVote(n)}
                            disabled={loading || selected !== null}
                        >
                            ★
                        </button>
                    ))}
                </div>
                {loading && <span className="text-xs text-gray-400 mt-2">Saving...</span>}
                {selected !== null && !loading && (
                    <span className="text-xs text-green-600 mt-2">
                        Thank you for your feedback!
                    </span>
                )}
            </div>
        </div>
    );
};