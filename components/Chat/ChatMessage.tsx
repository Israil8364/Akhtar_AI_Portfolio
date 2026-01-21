'use client';

import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
                "flex w-full mb-6",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[85%] md:max-w-[75%] rounded-[1.5rem] px-6 py-4 shadow-sm",
                    isUser
                        ? "bg-blue-600 text-white shadow-blue-200"
                        : "liquid-glass text-black/80"
                )}
            >
                <div className="text-base leading-relaxed whitespace-pre-wrap break-words font-medium">
                    {message.content || (
                        <div className="flex gap-1 py-1">
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-1.5 h-1.5 rounded-full bg-black/20"
                            />
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                className="w-1.5 h-1.5 rounded-full bg-black/20"
                            />
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                className="w-1.5 h-1.5 rounded-full bg-black/20"
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
