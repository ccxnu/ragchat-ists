import { Ollama } from "ollama";

import { IEmbeddingModel } from "@/rag/llm/interfaces/IEmbeddingModel";

export class OllamaEmbedding implements IEmbeddingModel
{
    private ollama: Ollama;
    private model: string;

    constructor(host: string, model: string)
    {
        this.ollama = new Ollama({ host });
        this.model = model;
    }

    async embedDocuments(texts: string[]): Promise<number[][]>
    {
        const embeddings: number[][] = [];

        for (const text of texts)
        {
            const response = await this.ollama.embed({
                model: this.model,

                input: text,
            });

            embeddings.push(...response.embeddings);
        }
        return embeddings;
    }

    async embedQuery(text: string): Promise<number[]>
    {
        const response = await this.ollama.embeddings({
            model: this.model,
            prompt: text,
        });
        return response.embedding;
    }
}
