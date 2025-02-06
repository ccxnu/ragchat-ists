import OpenAI from "openai";

import { IEmbeddingModel } from "@/rag/llm/interfaces/IEmbeddingModel";

export class OpenAiEmbedding implements IEmbeddingModel
{
    private openai: OpenAI;
    private model: string;

    constructor(baseURL: string, apiKey: string, model: string)
    {
        this.openai = new OpenAI({ baseURL, apiKey });
        this.model = model;
    }

    async embedDocuments(texts: string[]): Promise<number[][]>
    {
        const embeddings: number[][] = [];

        for (const text of texts)
        {
            const response = await this.embedQuery(text);
            embeddings.push(response);
        }

        return embeddings;
    }

    async embedQuery(text: string): Promise<number[]>
    {
        const response = await this.openai.embeddings.create({
            model: this.model,
            input: text,
            //encoding_format: 'float'
        });

        return response.data[0].embedding; // Assuming the response is in the form { data: [{ embedding: [] }] }
    }
}
