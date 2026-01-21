'use client';

import { contact } from "@/config/contact";
import { Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/config/profile";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
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
                        className="rounded-full object-cover shadow-lg shadow-black/5"
                        priority
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="w-full max-w-2xl"
            >
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Let&apos;s Connect</h1>
                    <p className="text-black/60 text-lg">I&apos;m always open to discussing new AI opportunities</p>
                </div>

                {/* Contact card */}
                <div className="liquid-glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">Get in touch</span>
                            <h2 className="text-2xl font-black text-black">Contact Info</h2>
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-black/5 text-black/40 text-sm font-bold">@mdakhtar</span>
                    </div>

                    <div className="space-y-6 mb-10">
                        {/* Email */}
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-6 p-5 rounded-3xl bg-white border border-black/5 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-black/30 uppercase tracking-wider">Email Me</span>
                                <span className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors">{contact.email}</span>
                            </div>
                            <span className="ml-auto w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/20 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                                <Send className="w-4 h-4" />
                            </span>
                        </a>

                        {/* Phone */}
                        <div className="flex items-center gap-6 p-5 rounded-3xl bg-white border border-black/5">
                            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-black/30 uppercase tracking-wider">Call Me</span>
                                <span className="text-lg font-bold text-black">{contact.phone}</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-6 p-5 rounded-3xl bg-white border border-black/5">
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-black/30 uppercase tracking-wider">Based In</span>
                                <span className="text-lg font-bold text-black">{contact.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-10 border-t border-black/5">
                        {contact.socials.linkedin && (
                            <a
                                href={contact.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-2xl bg-black/5 text-sm font-bold text-black/60 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            >
                                LinkedIn
                            </a>
                        )}
                        {contact.socials.instagram && (
                            <a
                                href={contact.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-2xl bg-black/5 text-sm font-bold text-black/60 hover:bg-pink-500 hover:text-white transition-all shadow-sm"
                            >
                                Instagram
                            </a>
                        )}
                        {contact.socials.facebook && (
                            <a
                                href={contact.socials.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-2xl bg-black/5 text-sm font-bold text-black/60 hover:bg-blue-800 hover:text-white transition-all shadow-sm"
                            >
                                Facebook
                            </a>
                        )}
                    </div>
                </div>

                {/* Message below */}
                <div className="mt-12 px-6 text-center">
                    <p className="text-lg text-black/50 font-medium">
                        You can find my contact information above! Feel free to reach out anytime. I&apos;d be happy to chat! 😊
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
