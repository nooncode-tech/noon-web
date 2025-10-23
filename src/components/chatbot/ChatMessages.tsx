import { RefObject } from 'react';
import { Message } from '@/types';
import { formatBotResponse } from '@/utils/textUtils';
import { TypingIndicator } from './TypingIndicator';
import { CodingIndicator } from './CodingIndicator';
import { ContactAgent } from './ContactAgent';
import { SatisfactionInline } from './SatisfactionInline';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

interface ChatMessagesProps {
    responses: Message[];
    isTyping: boolean;
    isCoding: boolean;
    showContactAgent: boolean;
    showSatisfactionInline: boolean;
    conversationId: string | null;
    onSatisfactionDone: () => void;
    messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const ChatMessages = ({ responses, isTyping, isCoding, showContactAgent, conversationId, showSatisfactionInline, onSatisfactionDone, messagesEndRef }: ChatMessagesProps) => {
    const isMobile = useIsMobile();

    return (
        <div
            className={`
                            flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[var(--principal-background-color)] custom-scrollbar
                            ${isMobile ? "max-h-none min-h-0" : "max-h-80"}
                        `}
            style={
                isMobile
                ? {
                    height: "1px",
                    minHeight: 0,
                    flexGrow: 1,
                    overflowX: "hidden",
                    }
                : { minHeight: 200, overflowX: "hidden" }
            }
            >
            {responses.length === 0 && (
                <div className="m-auto">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--principal-background-color)] flex items-center justify-center">
                        <Image
                            src="/base/profesor.gif"
                            className="w-16 h-auto text-white transition-transform duration-300 group-hover:scale-110"
                            width={64}
                            height={64}
                            alt="Chatbot Icon"
                        />
                    </div>
                    <h4 className="text-white text-base font-medium text-center ">
                        What can Maxwell do for you?
                    </h4>
                    <p className="text-gray-200 text-xs text-center mb-4">
                        He creates ultra-efficient tech solutions for any sector
                        and delivers 100% interactive, tailor-made prototypes.
                    </p>
                    <ul className="text-gray-400 text-xs mt-1 list-decimal px-2">
                        <li className="ml-4 mb-5">
                            State your goal in one sentence. Examples: <br />
                            <span className="italic">
                                “Create an Amazon/Shopify–style store with catalog,
                                cart, and shipping, so we centralize sales and
                                automate invoicing.”
                            </span>
                            <br />
                            <br />
                            <span className="italic">
                                “Launch an Airbnb–style marketplace to rent
                                spaces/rooms/equipment with calendar and secure
                                payments, so we monetize idle inventory.”
                            </span>
                        </li>

                        <li className="ml-4 mb-5">
                            Answer one question at a time
                        </li>

                        <li className="ml-4 mb-5">
                            Share links/assets and metrics (if you have them).
                        </li>

                        <li className="ml-4 mb-5">
                            Ask for the prototype or the project summary.
                        </li>

                        <li className="ml-4">
                            List your change requests for the project (1, 2, 3).
                        </li>
                    </ul>
                </div>
            )}

            {responses.map((res, index) => {

                return (
                <div key={index} className="space-y-3">
                    {res.question || res.questionImageUrl ? (
                        <div className="flex justify-end">
                            <div className="rounded-2xl bg-[var(--principal-button-color)] px-4 py-3 text-white max-w-[80%] text-sm">
                                {res.questionImageUrl && (
                                    <img 
                                        src={res.questionImageUrl} 
                                        alt="User attachment" 
                                        className="w-full rounded-md mb-2 max-w-xs"
                                    />
                                )}
                                {res.question && <span>{res.question}</span>}
                            </div>
                        </div>
                    ): null}
                    {res.answer && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl bg-white px-4 py-3 text-gray-800 max-w-[80%] text-sm">
                                {formatBotResponse(res.answer)}
                            </div>
                        </div>
                    )}
                </div>
                )}
            )}

            {isTyping && <TypingIndicator />}

            {isCoding && <CodingIndicator />}

            {showContactAgent && <ContactAgent />}

            {showSatisfactionInline && conversationId && (
                <SatisfactionInline
                    conversationId={conversationId}
                    onDone={onSatisfactionDone}
                />
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};