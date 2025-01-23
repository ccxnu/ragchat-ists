import ollama from 'ollama';

import { IEmbeddings } from '../interfaces/embeddings.interface';

export class OllamaNativeEmbeddings implements IEmbeddings
{
  private model: string;
  private baseUrl: string;

  constructor({ model, baseUrl }: { model: string; baseUrl: string })
  {
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async embedDocuments(texts: string[]): Promise<number[][]>
  {
    const embeddings: number[][] = [];

    for (const text of texts)
    {
      const response = await ollama.embed({
        model: this.model,
        input: text,
      });

      embeddings.push(...response.embeddings);
    }
    return embeddings;
  }

  async embedQuery(text: string): Promise<number[]>
  {
    const response = await ollama.embeddings({
      model: this.model,
      prompt: text,
    });
    return response.embedding;
  }
}
