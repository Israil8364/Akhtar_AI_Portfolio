import { Message } from "@/lib/types";
import { streamChatGroq } from "./groq";
import { streamChatGemini } from "./gemini";

const provider = process.env.AI_PROVIDER || 'groq';

export async function streamChat(messages: Message[]): Promise<ReadableStream> {
    if (provider === 'groq') {
        return streamChatGroq(messages);
    } else if (provider === 'gemini') {
        return streamChatGemini(messages);
    } else {
        throw new Error(`Unknown AI provider: ${provider}`);
    }
}
