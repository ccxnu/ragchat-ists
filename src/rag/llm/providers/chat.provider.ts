import { InternalServerErrorException } from "@nestjs/common";

import { EnvService } from "@/infra/env/env.service";
import { ChatModels } from "@/rag/llm/constant";
import { IChatModel } from "@/rag/llm/interfaces/IChatModel";
import { OllamaChat } from "@/rag/llm/services/chat/ollama";
import { OpenAIChat } from "@/rag/llm/services/chat/openia";

function createOllamaModel(env: EnvService): IChatModel
{
    const host = env.get("OLLAMA_URL");
    const model = env.get("OLLAMA_MODEL_CHAT");

    return new OllamaChat(host, model);
}

function createOpenAiModel(env: EnvService): IChatModel
{
    const url = env.get("OPENAI_URL");
    const model = env.get("OPENAI_MODEL");
    const apiKey = env.get("OPENAI_APIKEY");

    return new OpenAIChat(apiKey, url, model);
}

export function createChatModel(model: ChatModels, env: EnvService): IChatModel
{
    if (model === "OLLAMA") return createOllamaModel(env);
    else if (model === "OPENAI") return createOpenAiModel(env);
    else throw new InternalServerErrorException("Invalid type of llm model.");
}
