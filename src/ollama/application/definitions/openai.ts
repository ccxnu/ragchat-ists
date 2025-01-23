import OpenAI from 'openai';

import { alfoSystemPrompt } from './prompt';

export class OpenAIChat
{
  private openai: OpenAI;
  private model: string;

  constructor(apiKey: string, baseURL: string, model: string)
  {
    this.openai = new OpenAI({
      apiKey,
      baseURL,
    });
    this.model = model;
  }

  async chat(messages: { role: 'user' | 'assistant'; content: string }[]): Promise<string>
  {
    // Agregar el template del sistema al inicio de los mensajes
    const fullMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: alfoSystemPrompt },
      ...messages.map(msg => ({
        role: msg.role, // Asegúrate de que el rol sea 'system', 'user' o 'assistant'
        content: msg.content,
      })),
    ];


    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: fullMessages,
      temperature: 0.7, // Controla la aleatoriedad de las respuestas
      max_tokens: 4096, // Define el tamaño del contexto que el modelo puede manejar
    });

    if (!response.choices[0].message.content) return '';

    return response.choices[0].message.content;
  }
}
