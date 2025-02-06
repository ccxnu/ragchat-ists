export interface Document
{
    content: string;
    metadata: Record<string, any>;
}

export interface VectorDocument
{
    content: string;
    metadata: Record<string, any>;
    vector: string;
}

export abstract class IVectorStore
{
    abstract addDocuments(docs: VectorDocument[], table: string): Promise<void>;
    abstract search(query: number[], k: number, table: string): Promise<Document[]>;
}
