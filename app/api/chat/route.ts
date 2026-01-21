import { buildSystemPrompt } from "@/lib/ai/prompts";
import { streamChat } from "@/lib/ai";
import { Message } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages }: { messages: Message[] } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages format" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const systemPrompt = buildSystemPrompt();
        const fullMessages: Message[] = [
            { role: "system", content: systemPrompt },
            ...messages,
        ];

        const stream = await streamChat(fullMessages);

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to process chat request" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
