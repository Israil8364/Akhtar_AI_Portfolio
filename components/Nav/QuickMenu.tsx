'use client';

import { faqCategories } from "@/config/faq";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle } from "lucide-react";

interface QuickMenuProps {
    onClose: () => void;
    onQuestionClick?: (question: string) => void;
}

export function QuickMenu({ onClose, onQuestionClick }: QuickMenuProps) {
    const handleQuestionClick = (question: string) => {
        if (onQuestionClick) {
            onQuestionClick(question);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-white/40 backdrop-blur-xl"
                />

                {/* Menu */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative liquid-glass rounded-[2rem] p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-black/5"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-black tracking-tight">FAQ & Insights</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/40 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {faqCategories.map((category, idx) => (
                            <div key={idx}>
                                <h4 className="text-xs font-bold text-black/30 uppercase tracking-[0.2em] mb-4 ml-1">
                                    {category.title}
                                </h4>
                                <div className="space-y-3">
                                    {category.questions.map((question, qIdx) => (
                                        <button
                                            key={qIdx}
                                            onClick={() => handleQuestionClick(question)}
                                            className="w-full text-left px-5 py-4 rounded-2xl bg-white/50 border border-black/5 hover:border-blue-500 hover:bg-white hover:scale-[1.02] transition-all duration-300 text-base font-bold text-black/70 hover:text-blue-600 shadow-sm"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-6 border-t border-black/5 text-center">
                        <p className="text-sm font-medium text-black/40">
                            Can&apos;t find what you&apos;re looking for? Just ask me in the chat!
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
