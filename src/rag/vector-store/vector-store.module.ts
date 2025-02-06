import { DynamicModule, Module } from "@nestjs/common";

import { EnvModule } from "@/infra/env/env.module";
import { EnvService } from "@/infra/env/env.service";

import { VectorDatabasesType } from "./constant";
import { IVectorStore } from "./interfaces/vector-store.interface";
import { createVectorDatabase } from "./providers/vector-store.provider";

@Module({
    imports: [EnvModule],
    exports: [IVectorStore],
})
export class VectorStoreModule
{
    static register(type: VectorDatabasesType): DynamicModule
    {
        return {
            module: VectorStoreModule,
            providers: [
                {
                    provide: IVectorStore,
                    useFactory: (env: EnvService) => createVectorDatabase(type, env),
                    inject: [EnvService],
                },
            ],
        };
    }
}
