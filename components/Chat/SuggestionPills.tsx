'use client';

import { motion } from "framer-motion";

interface SuggestionPillsProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

export function SuggestionPills({ suggestions, onSelect }: SuggestionPillsProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, idx) => (
                <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelect(suggestion)}
                    className="px-5 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-black/5 text-black/60 text-sm font-bold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all shadow-sm"
                >
                    {suggestion}
                </motion.button>
            ))}
        </div>
    );
}
