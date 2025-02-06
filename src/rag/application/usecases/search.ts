import { Injectable } from "@nestjs/common";

import { IEmbeddingModel } from "@/rag/llm/interfaces/IEmbeddingModel";
import { Document, IVectorStore } from "@/rag/vector-store/interfaces/vector-store.interface";

@Injectable()
export class SearchOnVectorStoreUseCase
{
    private TABLE_NAME = "collection_anuncios";

    constructor(
        private readonly embed: IEmbeddingModel,
        private readonly vectorStore: IVectorStore,
    )
    {}

    async execute(query: string, k: number): Promise<Document[]>
    {
        const queryEmbedding = await this.embed.embedQuery(query);
        return this.vectorStore.search(queryEmbedding, k, this.TABLE_NAME);
    }
}
