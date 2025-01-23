import { DynamicModule, Module } from '@nestjs/common';

import { EnvModule } from '@/infra/env/env.module';
import { EnvService } from '@/infra/env/env.service';

import { TEXT_EMBEDDING_MODEL, VECTOR_DATABASE, VECTOR_STORE_TYPE } from './application/constants/rag.constant';
import { createTextEmbeddingModel } from './application/embeddings/create-embedding-model';
import { EmbeddingModels } from './application/types/embedding-models.type';
import { VectorDatabasesType } from './application/types/vector-databases.type';
import { createVectorDatabase } from './application/vector-databases';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './infra/http/vector-store.controller';

@Module({
  imports: [EnvModule],
  controllers:
  [
    VectorStoreController
  ],
  providers:
  [
    VectorStoreService,
  ],
  exports:
  [
    VectorStoreService
  ],
})
export class VectorStoreModule
{
  static register(embeddingModel: EmbeddingModels, vectorStoreType: VectorDatabasesType):
    DynamicModule
  {
    return {
      module: VectorStoreModule,
      providers:
      [
        {
          provide: TEXT_EMBEDDING_MODEL,
          useFactory: (env: EnvService) => createTextEmbeddingModel(env, embeddingModel),
          inject: [EnvService],
        },
        {
          provide: VECTOR_STORE_TYPE,
          useValue: vectorStoreType,
        },
        {
          provide: VECTOR_DATABASE,
          useFactory: (type: VectorDatabasesType, env: EnvService) =>
            createVectorDatabase(type, env),
          inject: [VECTOR_STORE_TYPE, EnvService],
        },
      ],
    };
  }
}
