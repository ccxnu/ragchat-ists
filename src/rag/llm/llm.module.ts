import { DynamicModule, Module } from "@nestjs/common";

import { EnvModule } from "@/infra/env/env.module";
import { EnvService } from "@/infra/env/env.service";

import { ChatModels, EmbeddingModels } from "./constant";
import { IChatModel } from "./interfaces/IChatModel";
import { IEmbeddingModel } from "./interfaces/IEmbeddingModel";
import { createChatModel } from "./providers/chat.provider";
import { createEmbeddingModel } from "./providers/embedding.provider";

@Module({
    imports: [EnvModule],
    exports: [IChatModel, IEmbeddingModel],
})
export class LlmModule
{
    static register(model: ChatModels, embed: EmbeddingModels): DynamicModule
    {
        return {
            module: LlmModule,
            providers: [
                {
                    provide: IChatModel,
                    useFactory: (env: EnvService) => createChatModel(model, env),
                    inject: [EnvService],
                },
                {
                    provide: IEmbeddingModel,
                    useFactory: (env: EnvService) => createEmbeddingModel(embed, env),
                    inject: [EnvService],
                },
            ],
        };
    }
}
