'use client';

import { projects } from "@/config/projects";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const project = projects[currentIndex];

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

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
                className="w-full max-w-5xl"
            >
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">My Projects</h1>
                    <p className="text-black/60 text-lg">A showcase of my recent AI & Automation work</p>
                </div>

                <div className="relative">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full"
                        >
                            <div className="liquid-glass rounded-[2rem] p-8 md:p-12 shadow-xl flex flex-col lg:flex-row gap-10">
                                {/* Left side: Content */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wider uppercase">
                                            {project.category}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-black mt-6 mb-4 text-black leading-tight">
                                            {project.title}
                                        </h2>
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-black/70 text-lg leading-relaxed whitespace-pre-wrap">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Links */}
                                    {project.links && (
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {project.links.demo && (
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    View Live Demo
                                                </a>
                                            )}
                                            {project.links.caseStudy && (
                                                <a
                                                    href={project.links.caseStudy}
                                                    target="_blank"
                                                    className="px-8 py-3 rounded-full bg-white border-2 border-slate-100 text-slate-900 font-bold flex items-center gap-2 hover:border-blue-600 hover:text-blue-600 hover:scale-105 transition-all"
                                                >
                                                    Case Study
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Right side: Image showcase */}
                                <div className="lg:w-[45%] flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        {[1, 2, 3, 4].map((idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square bg-slate-50 rounded-3xl overflow-hidden relative group border border-black/5"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6 text-center">
                                                    <span className="text-slate-400 font-medium text-sm">
                                                        Visual {idx}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    {projects.length > 1 && (
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6">
                            <button
                                onClick={prevProject}
                                className="w-12 h-12 rounded-full glass border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="text-sm font-bold text-black/40 uppercase tracking-widest">
                                {currentIndex + 1} / {projects.length}
                            </span>
                            <button
                                onClick={nextProject}
                                className="w-12 h-12 rounded-full glass border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
