'use client';

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
}

export function GlassButton({ children, onClick, className, type = 'button' }: GlassButtonProps) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={cn(
                "glass rounded-2xl px-6 py-4 font-medium text-sm md:text-base",
                "transition-all duration-200 ease-out",
                "hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 hover:scale-[1.02]",
                "active:scale-[0.98] active:shadow-sm",
                "focus-visible:ring-2 focus-visible:ring-purple-500/50",
                className
            )}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.button>
    );
}
