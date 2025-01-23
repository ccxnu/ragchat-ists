export abstract class IEmbeddings
{
  abstract embedDocuments(texts: string[]): Promise<number[][]>;
  abstract embedQuery(text: string): Promise<number[]>;
}
