import { Injectable } from "@nestjs/common";

import { IEmbeddingModel } from "@/rag/llm/interfaces/IEmbeddingModel";
import { Document, IVectorStore } from "@/rag/vector-store/interfaces/vector-store.interface";

@Injectable()
export class SaveOnVectorStoreUseCase
{
    private TABLE_NAME = "collection_anuncios";

    constructor(
        private readonly embed: IEmbeddingModel,
        private readonly vectorStore: IVectorStore,
    )
    {}

    async execute(body: Document[]): Promise<void>
    {
        const docs = await Promise.all(
            body.map(async (doc) =>
            {
                const embedding = await this.embed.embedQuery(doc.content);
                return {
                    ...doc,
                    vector: JSON.stringify(embedding), // Agregar el embedding al documento
                };
            }),
        );

        await this.vectorStore.addDocuments(docs, this.TABLE_NAME);
    }
}
