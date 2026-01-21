'use client';

import { cn } from "@/lib/utils";

interface ChipProps {
    children: string;
    className?: string;
    onClick?: () => void;
}

export function Chip({ children, className, onClick }: ChipProps) {
    return (
        <span
            onClick={onClick}
            className={cn(
                "inline-block rounded-full px-4 py-1.5 text-xs font-medium border border-gray-200 transition-all duration-300",
                onClick && "cursor-pointer active:scale-95",
                className
            )}
        >
            {children}
        </span>
    );
}
