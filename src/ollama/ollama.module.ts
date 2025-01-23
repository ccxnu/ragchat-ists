import { Module } from '@nestjs/common';

//import { OllamaChatModelProvider } from './application/providers/ollama-chat-model.provider';
import { EnvModule } from '@/infra/env/env.module';

import { OpenAIChatModelProvider } from './application/providers/openai-chat-model.provider';

@Module({
  imports: [EnvModule],
  providers:
  [
    //OllamaChatModelProvider,
    OpenAIChatModelProvider,
  ],
  exports:
  [
    //OllamaChatModelProvider,
    OpenAIChatModelProvider,
  ],
})
export class OllamaModule
{}
