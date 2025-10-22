// /components/chatbot/ChatWindow.tsx
import { useChat } from '@/hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { LoginView } from './LoginView';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useEffect } from 'react';

type ChatState = ReturnType<typeof import('@/hooks/useChat').useChat>;

interface ChatWindowProps {
    onClose: () => void;
    chatState: ChatState;
}

export const ChatWindow = ({ onClose, chatState }: ChatWindowProps) => {
    const {
        profile,
        responses,
        loading,
        isTyping,
        isCoding,
        showSatisfactionInline,
        showSuggested,
        setShowSuggested,
        handleSend,
        userMessage,
        setUserMessage,
        imagePreview,
        setImagePreview,
        setFileToUpload,
        handleGoogleSuccess,
        conversationId,
        messagesEndRef,
        showContactAgent
    } = chatState;

    const isMobile = useIsMobile();

    return (
        <div className={`fixed z-50 ${isMobile ? "inset-0 w-full h-full max-w-full max-h-full" : "bottom-6 right-6 max-w-sm w-full"} `}
            style={isMobile ? { padding: 0, margin: 0, width: "100vw", height: "100dvh", maxWidth: "100vw", maxHeight: "100dvh", left: 0, top: 0, right: 0, bottom: 0, overflow: "hidden", background: "rgba(0,0,0,0.05)", }
                : {}
            }>
            <div className={`relative flex flex-col overflow-hidden ${isMobile ? "h-full w-full" : "p-4"}`}>

                <div
                    className={`
                        flex flex-col shadow-2xl border border-[var(--secondary-border-color)] backdrop-blur-sm
                        ${isMobile
                            ? "h-full w-full max-w-full max-h-full rounded-none"
                            : "rounded-3xl"
                        }
                        `}
                    style={
                        isMobile
                            ? {
                                height: "100dvh",
                                width: "100vw",
                                maxHeight: "100dvh",
                                maxWidth: "100vw",
                                overflow: "hidden",
                            }
                            : {}
                    }
                >

                    <ChatHeader onClose={onClose} />

                    {!profile ? (
                        <LoginView onSuccess={handleGoogleSuccess} />
                    ) : (
                        <>
                            <ChatMessages
                                responses={responses}
                                isTyping={isTyping}
                                isCoding={isCoding}
                                showContactAgent={showContactAgent}
                                showSatisfactionInline={showSatisfactionInline}
                                conversationId={conversationId}
                                onSatisfactionDone={() => setShowSuggested(true)} // Oculta estrellas y muestra sugerencia
                                messagesEndRef={messagesEndRef}
                            />
                            <ChatInput
                                onSend={handleSend}
                                userMessage={userMessage}
                                setUserMessage={setUserMessage}
                                loading={loading || isTyping || isCoding}
                                disabled={showSatisfactionInline}
                                isMobile={isMobile}
                                profile={profile}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                setFileToUpload={setFileToUpload}
                                showSuggested={showSuggested}
                                onHideSuggested={() => setShowSuggested(false)}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};