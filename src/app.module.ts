import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/infra/auth/auth.module';
import { envSchema } from '@/infra/env/env';
import { HttpModule } from '@/interface/http/http.module';
import { RagModule } from '@/src/rag-chat/rag.module';

@Module (
  {
    imports:
    [
      ConfigModule.forRoot({
        validate: (env) => envSchema.parse(env),
        isGlobal: true,
        cache: true,
      }),
      AuthModule,
      HttpModule,
      RagModule,
    ]
  }
)
export class AppModule
{}
