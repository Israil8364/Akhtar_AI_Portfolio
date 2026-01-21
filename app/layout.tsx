import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { SplashCursor } from "@/components/SplashCursor";
import { BottomNav } from "@/components/Nav/BottomNav";
import { PageTransition } from "@/components/UI/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Akhtar AI Twin | AI Automation Specialist",
    description: "I build smart AI automations that save teams hours and scale businesses without extra hires. Portfolio of Md Akhtar from Kolkata, India.",
    keywords: ["AI Automation", "Lead Generation", "Sales Automation", "Python", "AI", "Marketing Automation"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <BackgroundLayer />
                <SplashCursor />
                <main className="min-h-screen pb-24 relative z-10">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <BottomNav />
            </body>
        </html>
    );
}
