'use client';

import { skills } from "@/config/skills";
import { Lightbulb, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SkillsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
            {/* Back button */}
            <div className="fixed top-8 left-8 z-20">
                <Link
                    href="/"
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:bg-black/5 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
            >
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 mb-6">
                        <Lightbulb className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Skills & Expertise</h1>
                    <p className="text-black/60 text-lg max-w-2xl mx-auto">
                        A specialized toolkit focused on building high-impact AI agents and automation systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="liquid-glass rounded-[2rem] p-8 md:p-10 shadow-xl h-fit"
                        >
                            <h2 className="text-2xl font-black mb-6 text-black flex items-center gap-3">
                                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                {skillGroup.group}
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {skillGroup.skills.map((skill, skillIdx) => (
                                    <div
                                        key={skillIdx}
                                        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 border border-black/5 hover:border-purple-200 hover:bg-white transition-all group"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-purple-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-black/80 font-semibold">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    <div className="liquid-glass rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col justify-center bg-gradient-to-br from-purple-500/5 to-pink-500/5 h-fit">
                        <h3 className="text-2xl font-black mb-4">Continuous Learning</h3>
                        <p className="text-black/60 leading-relaxed">
                            I'm constantly exploring new AI models, frameworks, and automation strategies to ensure my clients always get the most cutting-edge solutions.
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-purple-600 font-bold">
                            <span>Always evolving</span>
                            <span className="w-12 h-0.5 bg-purple-200"></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
