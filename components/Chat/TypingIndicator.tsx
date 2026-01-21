'use client';

import { motion } from "framer-motion";

export function TypingIndicator() {
    return (
        <div className="flex w-full mb-6 justify-start">
            <div className="liquid-glass rounded-2xl px-6 py-4 flex items-center gap-1.5 shadow-sm">
                {[0, 1, 2].map((idx) => (
                    <motion.div
                        key={idx}
                        animate={{
                            y: [0, -6, 0],
                            opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: idx * 0.15
                        }}
                        className="w-2 h-2 bg-black/30 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
