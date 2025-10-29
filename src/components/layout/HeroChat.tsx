"use client";
import { useState, useRef, ChangeEvent } from "react";
import { useChatContext } from "@/context/ChatContext";
import styles from "./HeroChat.module.css";

export default function HeroChat() {
    const { setContextMessage, setOpen, setFileToUpload, setImagePreview: setGlobalImagePreview } = useChatContext();
    const [message, setMessage] = useState("");
    const [localImagePreview, setLocalImagePreview] = useState<string | null>(null);
    const [localFileToUpload, setLocalFileToUpload] = useState<File | null>(null);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value);
    }

    function handleSend() {
        if (!message.trim() && !localFileToUpload) return;
        
        setGlobalImagePreview(localImagePreview);
        setFileToUpload(localFileToUpload);
        
        setOpen(true); 

        if (message.trim()) {
            setContextMessage(message);
        } else if (localFileToUpload) {
            setContextMessage(""); 
        }
        
        setMessage("");
        setLocalImagePreview(null);
        setLocalFileToUpload(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }


    function handlePromptClick(promptMessage: string) {
        if (localImagePreview) removeImage();
        setContextMessage(promptMessage);
        setMessage(promptMessage);
    }

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLocalFileToUpload(file);
            if (localImagePreview) URL.revokeObjectURL(localImagePreview);
            setLocalImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUploadAndChatClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        if (localImagePreview) {
            URL.revokeObjectURL(localImagePreview);
        }
        setLocalImagePreview(null);
        setLocalFileToUpload(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const promptMsgNoon = "What is Noon and how can you help me?";
    const promptMsgProto = "I want a prototype of a [product/service] that is [web/mobile/desktop] and does [primary function]; with [feature 1] and [feature 2].";

    return (
        <div className={styles.form}>
            <textarea
                className={styles.textarea}
                value={message}
                onChange={handleChange}
                placeholder="What do you need? e.g., &#34;An Airbnb-style booking app.&#34;"
            />

            {localImagePreview && (
                <div className={styles.imagePreview}>
                    <img src={localImagePreview} alt="Preview" className="h-20 w-auto rounded-md border border-gray-300" />
                    <button
                        onClick={removeImage}
                        className={styles.imagePreviewDelete}
                        aria-label="Remove image"
                        title="Remove image"
                    >
                        &times;
                    </button>
                </div>
            )}

            <div className={styles.buttons}>
                <div className={styles.prompts}>
                    <button onClick={() => handlePromptClick(promptMsgNoon)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M8 2.02C8.49 2.35 9.56 4.39 9.56 8C9.56 11.61 8.5 13.65 8 13.98C7.51 13.65 6.44 11.61 6.44 8C6.44 4.39 7.5 2.35 8 2.02ZM8 0.5C6.31 0.5 4.94 3.86 4.94 8C4.94 12.14 6.31 15.5 8 15.5C9.69 15.5 11.06 12.14 11.06 8C11.06 3.86 9.69 0.5 8 0.5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M8 2C11.31 2 14 4.69 14 8C14 11.31 11.31 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2ZM8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M14.6498 7.21V8.71H1.34998V7.21H14.6498Z"
                                fill="currentColor"
                            />
                        </svg>
                        About Noon
                    </button>
                    <button onClick={() => handlePromptClick(promptMsgProto)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                            fill="none"
                        >
                        <path
                            d="M3.9 11.89H10.09M3.9 11.89C2.38 10.88 1.38 9.16 1.38 7.2C1.38 4.09 3.89 1.58 6.99 1.58C10.09 1.58 12.61 4.1 12.61 7.2C12.61 9.16 11.61 10.88 10.09 11.89M3.9 11.89V13.74C3.9 14.0161 4.12386 14.24 4.4 14.24H9.59C9.86615 14.24 10.09 14.0161 10.09 13.74V11.89M9.26 14.23C9.26 15.48 8.25 16.49 7 16.49C5.75 16.49 4.74 15.48 4.74 14.23"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                        />
                        </svg>
                        Prototype
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden" 
                    />
                    <button
                        onClick={handleUploadAndChatClick}
                        type="button"
                        aria-label="Attach image"
                        title="Attach image"
                        className={`
                        p-2 rounded-lg
                        flex items-center justify-center
                        transition-colors duration-150
                        bg-transparent text-white
                        `}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                </div>

                <button onClick={handleSend} className={styles.send}>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <g transform="rotate(90 12 12)">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
}