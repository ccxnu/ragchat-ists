import { Inject, Injectable } from '@nestjs/common';

import { TEXT_EMBEDDING_MODEL, VECTOR_DATABASE } from './constants/rag.constant';
import { DocumentDB } from './interfaces/document';
import { IEmbeddings } from './interfaces/embeddings.interface';
import { IVectorStore } from './interfaces/vector-database.interface';

@Injectable()
export class VectorStoreService
{
  constructor
  (
    @Inject(TEXT_EMBEDDING_MODEL) private embeddings: IEmbeddings,
    @Inject(VECTOR_DATABASE) private vectorService: IVectorStore,
  )
  {}

  async saveDocuments(body: DocumentDB[]): Promise<void>
  {
    const docs = await Promise.all(
      body.map(async (doc) => 
{
        const embedding = await this.embeddings.embedQuery(doc.content);
        return {
            ...doc,
            vector: JSON.stringify(embedding), // Agregar el embedding al documento
        };
      })
    );

    await this.vectorService.addDocuments(docs);
  }

  async search(query: string, k: number): Promise<DocumentDB[]>
  {
    const queryEmbedding = await this.embeddings.embedQuery(query);
    return this.vectorService.search(queryEmbedding, k);
  }
}
