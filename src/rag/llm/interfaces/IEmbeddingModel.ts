export abstract class IEmbeddingModel
{
    abstract embedDocuments(texts: string[]): Promise<number[][]>;
    abstract embedQuery(text: string): Promise<number[]>;
}
