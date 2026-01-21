'use client';

import { useState, useRef, useEffect } from "react";
import { Message } from "@/lib/types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestionPills } from "./SuggestionPills";

const defaultSuggestions = [
    "What are your projects?",
    "What are you working on right now?",
    "What are your skills?",
    "How can I reach you?"
];

export function ChatPanel() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessage = async (content: string) => {
        const userMessage: Message = { role: "user", content };
        setMessages(prev => [...prev, userMessage]);
        setShowSuggestions(false);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";

            setMessages(prev => [...prev, { role: "assistant", content: "" }]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    assistantContent += chunk;

                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = {
                            role: "assistant",
                            content: assistantContent
                        };
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again."
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {messages.length > 0 && (
                <div className="mb-6 max-h-[60vh] overflow-y-auto px-4">
                    {messages.map((message, idx) => (
                        <ChatMessage key={idx} message={message} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            )}

            {showSuggestions && messages.length === 0 && (
                <div className="mb-6 px-4">
                    <SuggestionPills
                        suggestions={defaultSuggestions}
                        onSelect={sendMessage}
                    />
                </div>
            )}

            <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
    );
}
