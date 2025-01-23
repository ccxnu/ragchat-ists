import { InternalServerErrorException } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { IEmbeddings } from '../interfaces/embeddings.interface';
import { EmbeddingModels } from '../types/embedding-models.type';
import { OllamaNativeEmbeddings } from './native.embeddings';

function createOllamaEmbeddingModel(env: EnvService): IEmbeddings
{
  const OLLAMA_EMBEDDING_MODEL = env.get('OLLAMA_EMBEDDING_MODEL');
  const OLLAMA_URL = env.get('OLLAMA_URL');

  return new OllamaNativeEmbeddings({
    model: OLLAMA_EMBEDDING_MODEL,
    baseUrl: OLLAMA_URL,
  });
}

export function createTextEmbeddingModel(env: EnvService, embeddingModel: EmbeddingModels): IEmbeddings
{
  if (embeddingModel === 'OLLAMA') return createOllamaEmbeddingModel(env);
  else
    throw new InternalServerErrorException('Invalid type of embedding model.');
}
