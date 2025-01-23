import { DocumentDB, VectorDocument } from './document';

export abstract class IVectorStore
{
  abstract addDocuments(docs: VectorDocument[]): Promise<void>;
  abstract search(query: number[], k: number): Promise<DocumentDB[]>;
}
