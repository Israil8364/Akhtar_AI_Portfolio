'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { profile } from "@/config/profile";
import { ChatPanel } from "@/components/Chat/ChatPanel";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Lightbulb, Mail, ArrowLeft, ArrowRight } from "lucide-react";

export default function HomePage() {
    const router = useRouter();
    const [isChatting, setIsChatting] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-white">
            {/* Info icon - Subtle and fixed */}
            <div className="fixed top-8 right-8 z-20">
                <button className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:bg-black/5 transition-all text-sm">
                    ⓘ
                </button>
            </div>

            <main className="w-full max-w-[900px] z-10 flex flex-col items-center">
                {isClient && (
                    <AnimatePresence mode="wait">
                        {!isChatting ? (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                            className="text-center w-full flex flex-col items-center"
                        >
                            {/* 1. Small headline: "Hey, i am Akhtar" */}
                            <p className="text-lg text-black/60 font-medium tracking-tight">
                                {profile.headline}
                            </p>

                            {/* Headline → Avatar: 28–36px spacing (using mb-8 = 32px) */}
                            <div style={{ height: '32px' }} />

                            {/* 2. Headline: "I cooked Automations" */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight max-w-3xl">
                                {profile.tagline}
                            </h1>

                            {/* Title → Avatar: 28–36px spacing (using 32px) */}
                            <div style={{ height: '32px' }} />

                            {/* 3. Avatar: Centered in the stack */}
                            <div className="relative w-40 h-40 md:w-44 md:h-44">
                                <Image
                                    src={profile.avatarUrl}
                                    alt={profile.name}
                                    width={176}
                                    height={176}
                                    className="rounded-full object-cover"
                                    priority
                                />
                            </div>

                            {/* Avatar → Search Bar: 22–28px spacing (using 24px) */}
                            <div style={{ height: '24px' }} />

                            {/* 4. Search Bar: Fixed width, rounded pill, subtle shadow with send button */}
                            <div className="w-full flex justify-center px-4">
                                <div className="w-full max-w-[560px] bg-white/50 backdrop-blur-xl rounded-full px-8 py-4 flex items-center justify-between border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:bg-white/80 transition-all cursor-text text-left" onClick={() => setIsChatting(true)}>
                                    <span className="text-black/30 text-base md:text-lg font-medium">Ask me anything...</span>
                                    <button 
                                        onClick={() => setIsChatting(true)}
                                        className="ml-4 bg-black/70 hover:bg-black/85 rounded-full p-2.5 flex items-center justify-center transition-all"
                                    >
                                        <ArrowRight className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Bar → Nav Cards: 18–22px spacing (using 20px) */}
                            <div style={{ height: '20px' }} />

                            {/* 5. Navigation Grid: Tight row, equal width, uniform radius */}
                            <div className="flex items-center justify-center gap-[14px] w-full px-4">
                                <button
                                    onClick={() => router.push("/me")}
                                    className="liquid-glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-all flex-1 min-w-0"
                                >
                                    <User className="w-5 h-5 text-[#10b981]" />
                                    <span className="text-sm font-bold text-black/80">Me</span>
                                </button>

                                <button
                                    onClick={() => router.push("/projects")}
                                    className="liquid-glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-all flex-1 min-w-0"
                                >
                                    <Briefcase className="w-5 h-5 text-[#3b82f6]" />
                                    <span className="text-sm font-bold text-black/80">Projects</span>
                                </button>

                                <button
                                    onClick={() => router.push("/skills")}
                                    className="liquid-glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-all flex-1 min-w-0"
                                >
                                    <Lightbulb className="w-5 h-5 text-[#8b5cf6]" />
                                    <span className="text-sm font-bold text-black/80">Skills</span>
                                </button>

                                <button
                                    onClick={() => router.push("/contact")}
                                    className="liquid-glass rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-all flex-1 min-w-0"
                                >
                                    <Mail className="w-5 h-5 text-[#f59e0b]" />
                                    <span className="text-sm font-bold text-black/80">Contact</span>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full flex flex-col items-center"
                        >
                            {/* Header for Chat Mode */}
                            <div className="flex items-center justify-between mb-8 w-full max-w-3xl bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-black/5 shadow-sm sticky top-4 z-20">
                                <button
                                    onClick={() => setIsChatting(false)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-black/5 transition-all text-black/60 font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back</span>
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold text-black leading-none">{profile.name}</span>
                                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
                                    </div>
                                    <Image
                                        src={profile.avatarUrl}
                                        alt={profile.name}
                                        width={40}
                                        height={40}
                                        className="rounded-xl object-cover"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <ChatPanel />
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                )}
            </main>

            {/* Subtle Background Watermark - Opacity 0.04, behind everything, centered */}
            <div className="fixed inset-0 pointer-events-none select-none -z-30 flex items-center justify-center">
                <h2 className="text-[25vw] md:text-[30vw] font-black tracking-tighter text-black uppercase opacity-[0.04] whitespace-nowrap">
                    AKHTAR
                </h2>
            </div>
        </div>
    );
}
