import { InternalServerErrorException } from "@nestjs/common";

import { EnvService } from "@/infra/env/env.service";
import { EmbeddingModels } from "@/rag/llm/constant";
import { IEmbeddingModel } from "@/rag/llm/interfaces/IEmbeddingModel";
import { OllamaEmbedding } from "@/rag/llm/services/embed/ollama";
import { OpenAiEmbedding } from "@/rag/llm/services/embed/openai";

function createOllamaEmbedding(env: EnvService): IEmbeddingModel
{
    const host = env.get("OLLAMA_URL");
    const model = env.get("OLLAMA_EMBEDDING_MODEL");

    return new OllamaEmbedding(host, model);
}

function createOpenAiEmbedding(env: EnvService): IEmbeddingModel
{
    const baseURL = env.get("OPENAI_URL");
    const model = env.get("OPENAI_MODEL_EMBED");
    const apiKey = env.get("OPENAI_APIKEY");

    return new OpenAiEmbedding(baseURL, apiKey, model);
}

export function createEmbeddingModel(embed: EmbeddingModels, env: EnvService): IEmbeddingModel
{
    if (embed === "OLLAMA") return createOllamaEmbedding(env);
    else if (embed === "OPENAI") return createOpenAiEmbedding(env);
    else throw new InternalServerErrorException("Invalid type of embedding model.");
}
