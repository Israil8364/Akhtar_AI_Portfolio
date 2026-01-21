'use client';

import { ArrowRight } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
}

export function ChatInput({ onSend, disabled, className, placeholder = "Ask me anything..." }: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn("w-full transition-all duration-300 px-4", className)}>
            <div className="liquid-glass rounded-full px-8 py-3 flex items-center justify-between gap-4 border border-white/80 shadow-xl bg-white/40">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 bg-transparent border-none outline-none text-base md:text-lg placeholder:text-gray-500 disabled:opacity-50 text-black font-medium"
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className={cn(
                        "p-3 rounded-full bg-[#3b82f6] text-white transition-all duration-300",
                        "hover:scale-110 shadow-lg active:scale-95 flex items-center justify-center",
                        "disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
