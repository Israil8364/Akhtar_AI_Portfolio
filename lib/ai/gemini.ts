import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function streamChatGemini(messages: Message[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Separate system prompt from conversation
    const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
    const conversationMessages = messages.filter(m => m.role !== 'system');

    // Build chat history for Gemini
    const history = conversationMessages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
        history,
        systemInstruction: systemPrompt,
    });

    const lastMessage = conversationMessages[conversationMessages.length - 1];
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    if (text) {
                        controller.enqueue(encoder.encode(text));
                    }
                }
                controller.close();
            } catch (error) {
                controller.error(error);
            }
        },
    });
}
