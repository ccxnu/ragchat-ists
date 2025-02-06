import { Module } from "@nestjs/common";

import { ChatUseCase } from "@/rag/application/usecases/chat";
import { SaveOnVectorStoreUseCase } from "@/rag/application/usecases/save";
import { SearchOnVectorStoreUseCase } from "@/rag/application/usecases/search";
import { ChatController } from "@/rag/interface/http/chat.controller";
import { SaveController } from "@/rag/interface/http/save.controller";
import { LlmModule } from "@/rag/llm/llm.module";
import { VectorStoreModule } from "@/rag/vector-store/vector-store.module";

@Module({
    imports: [LlmModule.register("OPENAI", "OLLAMA"), VectorStoreModule.register("PGVECTOR")],
    providers: [ChatUseCase, SaveOnVectorStoreUseCase, SearchOnVectorStoreUseCase],
    controllers: [ChatController, SaveController],
})
export class RagModule
{}
