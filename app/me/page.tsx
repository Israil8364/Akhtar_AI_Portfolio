'use client';

import { profile } from "@/config/profile";
import { Chip } from "@/components/UI/Chip";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 py-24 md:py-32 bg-transparent relative">
            {/* Back button */}
            <div className="fixed top-8 left-8 z-20">
                <Link
                    href="/"
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:bg-black/5 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
            </div>

            {/* Avatar at top */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Image
                        src={profile.avatarUrl}
                        alt={profile.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                        priority
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="w-full max-w-4xl"
            >
                {/* Main card with photo and bio */}
                <div className="liquid-glass rounded-[2.5rem] p-0 overflow-hidden mb-10 shadow-2xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Photo on left */}
                        <div className="md:w-1/3 bg-white flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-black/5">
                            <div className="relative w-full aspect-square md:aspect-auto md:h-full">
                                <Image
                                    src={profile.avatarUrl}
                                    alt={profile.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* Bio on right */}
                        <div className="md:w-2/3 p-10 flex flex-col justify-center">
                            <h1 className="text-3xl md:text-4xl font-black mb-2 text-black">{profile.name}</h1>

                            <div className="flex items-center gap-2 text-base text-black/50 font-medium mb-6">
                                <span>18 years old</span>
                                <span className="w-1 h-1 rounded-full bg-black/20"></span>
                                <span>{profile.location}</span>
                            </div>

                            <p className="text-lg text-black/70 leading-relaxed mb-8">
                                {profile.intro}
                            </p>

                            {/* Skill tags */}
                            <div className="flex flex-wrap gap-2.5">
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">AI Automation</Chip>
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">AI</Chip>
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">Storytelling</Chip>
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">Lead Generation</Chip>
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">Python</Chip>
                                <Chip className="bg-black text-white border-black px-5 py-2 text-sm">Sales</Chip>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed text below */}
                <div className="px-6 md:px-12 space-y-6">
                    <p className="text-lg text-black/70 leading-relaxed">
                        I'm <span className="font-bold text-black border-b-2 border-emerald-200">Md Akhtar</span>, and I specialize in building smart <span className="text-blue-600 font-bold">AI automations</span> that save teams hours and help scale businesses without the need for extra hires. Based in <span className="font-bold text-black">Kolkata, West Bengal</span>, I love turning messy workflows into seamless systems using tools like <span className="font-bold text-black text-blue-500">n8n, Make, Zapier, and OpenAI</span>.
                    </p>

                    <p className="text-lg text-black/70 leading-relaxed">
                        I'm a self-taught developer with a passion for <span className="text-purple-600 font-bold">AI in business</span> and innovative marketing strategies. When I'm not working on automations, you might find me exploring <span className="font-bold text-black cursor-help hover:text-blue-600 transition-colors">new technologies</span>, painting, or playing <span className="font-bold text-black border-b-2 border-red-200">chess and cricket</span>.
                    </p>

                    <div className="pt-8 w-full flex justify-center">
                        <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-xl text-black/60 font-medium max-w-xl">
                            "Turning complexity into simplicity through the power of AI."
                        </blockquote>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
