import { Injectable } from "@nestjs/common";

import { ChatMessage } from "@/rag/application/types/conversation-content.type";
import { IChatModel } from "@/rag/llm/interfaces/IChatModel";

import { SearchOnVectorStoreUseCase } from "./search";

@Injectable()
export class ChatUseCase
{
    private chat_history: ChatMessage[] = [];

    constructor(
        private readonly model: IChatModel,
        private readonly searchUseCase: SearchOnVectorStoreUseCase,
    )
    {}

    async execute(question: string): Promise<ChatMessage[]>
    {
        try
        {
            const context = await this.searchUseCase.execute(question, 5); // Busca los 5 documentos más relevantes
            const contextString = context.map((doc) => doc.content).join("\n");

            const messages: ChatMessage[] = [
                ...this.chat_history,
                { role: "user", content: `Context: ${contextString}\nQuestion: ${question}` },
            ];

            console.log("Enviando solicitud al LLM CHAT MODEL..."); // Log de la solicitud
            const aiResponse = await this.model.chat(messages);

            // Actualizar el historial de chat
            this.chat_history.push({ role: "user", content: question }, { role: "assistant", content: aiResponse });

            // Limitar el historial de chat a 10 mensajes
            if (this.chat_history.length > 10)
            {
                this.chat_history.shift();
            }

            const conversation: ChatMessage[] = [
                { role: "user", content: question },
                { role: "assistant", content: aiResponse },
            ];

            console.log(conversation);

            return conversation;
        }
        catch (ex)
        {
            console.error(ex);
            throw ex;
        }
    }
}
