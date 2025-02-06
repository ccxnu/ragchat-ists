import OpenAI from "openai";

import { ChatMessage, IChatModel } from "@/rag/llm/interfaces/IChatModel";

import { SystemPrompt } from "./prompt";

export class OpenAIChat implements IChatModel
{
    private openai: OpenAI;
    private model: string;

    constructor(apiKey: string, baseURL: string, model: string)
    {
        this.openai = new OpenAI({ apiKey, baseURL });
        this.model = model;
    }

    async chat(messages: ChatMessage[]): Promise<string>
    {
        // Agregar el template del sistema al inicio de los mensajes
        const fullMessages: OpenAI.ChatCompletionMessageParam[] = [
            { role: "system", content: SystemPrompt },
            ...messages.map((msg) => ({
                role: msg.role, // Asegúrate de que el rol sea 'system', 'user' o 'assistant'
                content: msg.content,
            })),
        ];
        try
        {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: fullMessages,
                temperature: 0.7, // Controla la aleatoriedad de las respuestas
                max_tokens: 4096, // Define el tamaño del contexto que el modelo puede manejar
            });

            const assistantMessage = response.choices[0].message.content || "";

            return assistantMessage;
        }
        catch (error)
        {
            console.error("Error en OpenAIChat:", error);
            throw new Error("Error al comunicarse con OpenIA");
        }
    }
}
