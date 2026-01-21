import Groq from "groq-sdk";
import { Message } from "@/lib/types";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function streamChatGroq(messages: Message[]) {
    const stream = await groq.chat.completions.create({
        messages: messages.map(m => ({
            role: m.role,
            content: m.content
        })),
        model: "llama-3.3-70b-versatile", // Fast and high quality
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
    });

    const encoder = new TextEncoder();

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(encoder.encode(content));
                    }
                }
                controller.close();
            } catch (error) {
                controller.error(error);
            }
        },
    });
}
