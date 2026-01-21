'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Briefcase, Lightbulb, Mail, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { QuickMenu } from "./QuickMenu";

const navItems = [
    { href: "/me", label: "Me", icon: User },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/skills", label: "Skills", icon: Lightbulb },
    { href: "/contact", label: "Contact", icon: Mail },
];

export function BottomNav() {
    const pathname = usePathname();
    const [showQuickMenu, setShowQuickMenu] = useState(false);

    if (pathname === '/') return null;

    return (
        <>
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="glass rounded-full px-4 py-3 flex items-center gap-2 md:gap-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 rounded-full transition-all duration-200",
                                    "flex items-center gap-2 min-w-[44px] justify-center",
                                    isActive
                                        ? "text-purple-600 bg-white/30"
                                        : "text-gray-700 hover:text-gray-900 hover:bg-white/10"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden md:inline text-sm font-medium">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/20 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button
                        onClick={() => setShowQuickMenu(!showQuickMenu)}
                        className={cn(
                            "px-4 py-2 rounded-full transition-all duration-200",
                            "flex items-center gap-2 min-w-[44px] justify-center",
                            "text-gray-700 hover:text-gray-900 hover:bg-white/10"
                        )}
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {showQuickMenu && (
                <QuickMenu onClose={() => setShowQuickMenu(false)} />
            )}
        </>
    );
}
