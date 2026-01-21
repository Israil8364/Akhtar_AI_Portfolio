import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
    return (
        <div className={cn("glass rounded-3xl p-8 md:p-10", className)}>
            {children}
        </div>
    );
}
