import { Provider } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { OPENAI_CHAT_MODEL } from '../constants/openai.constant';
import { OpenAIChat } from '../definitions/openai';

export const OpenAIChatModelProvider: Provider<OpenAIChat> =
{
  inject: [EnvService],
  provide: OPENAI_CHAT_MODEL,
  useFactory: (env: EnvService) =>
  {
    const url = env.get('DEEPSEEK_URL');
    const model = env.get('DEEPSEEK_MODEL');
    const apiKey = env.get('DEEPSEEK_API');

    return new OpenAIChat(apiKey, url, model);
  },
};
