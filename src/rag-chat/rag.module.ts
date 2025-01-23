import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { OllamaModule } from '../ollama/ollama.module';
import { VectorStoreModule } from '../vector-store/vector-store.module';
import { RagService } from './applications/rag.service';
import { RagController } from './presenters/http/rag.controller';

@Module({
  imports: [OllamaModule, VectorStoreModule.register('OLLAMA', 'PGVECTOR')],
  providers: [
    RagService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  controllers: [RagController],
})
export class RagModule
{}
