import { ChatResponse, Ollama } from "ollama";

import { ChatMessage, IChatModel } from "@/rag/llm/interfaces/IChatModel";

import { SystemPrompt } from "./prompt";

export class OllamaChat implements IChatModel
{
    private ollama: Ollama;
    private model: string;

    constructor(host: string, model: string)
    {
        this.ollama = new Ollama({ host });
        this.model = model;
    }

    async chat(messages: ChatMessage[]): Promise<string>
    {
        const fullMessages = [
            { role: "system", content: SystemPrompt },
            ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];

        try
        {
            const response: ChatResponse = await this.ollama.chat({
                model: this.model,
                messages: fullMessages,
                stream: false, // Permite que las respuestas se generen y envíen en tiempo real,
                keep_alive: "5m", // Mantener el modelo en memoria durante ...
                options: {
                    temperature: 0.7, // Controla la aleatoriedad de las respuestas
                    num_ctx: 2048, // Define el tamaño del contexto que el modelo puede manejar
                    num_predict: 300, // Longitud de respuesta moderada
                    top_k: 50, // Limita la selección a los K tokens más probables
                    top_p: 0.9, // Nucleus sampling para diversidad controlada
                    repeat_penalty: 1.1, // Penaliza la repetición de tokens en la salida
                    presence_penalty: 0.1, // Penaliza tokens que ya han aparecido en la respuesta
                    frequency_penalty: 0.1, // Penaliza tokens en función de su frecuencia de aparición, igual
                },
            });

            // TODO: save response in database to reports

            const assistantMessage = response.message?.content || "";

            return assistantMessage;
        }
        catch (error)
        {
            console.error("Error en OllamaChat:", error);
            throw new Error("Error al comunicarse con Ollama");
        }
    }
}
