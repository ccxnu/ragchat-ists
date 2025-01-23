import { Inject, Injectable } from '@nestjs/common';

import { OPENAI_CHAT_MODEL } from '@/src/ollama/application/constants/openai.constant';
import { OpenAIChat } from '@/src/ollama/application/definitions/openai';
import { VectorStoreService } from '@/src/vector-store/application/vector-store.service';

import { ChatMessage } from './types/conversation-content.type';

@Injectable()
export class RagService
{
  private chat_history: ChatMessage[] = [];

  constructor
  (
    @Inject(OPENAI_CHAT_MODEL) private openaiModel: OpenAIChat, // Usa la nueva clase
    private vectorStoreService: VectorStoreService,
  )
  {}

  async ask(question: string): Promise<ChatMessage[]>
  {
    try
    {
      console.log('Pregunta recibida:', question); // Log de la pregunta
      // Obtener el contexto relevante usando el vector store
      console.log('Buscando contexto en el vector store...'); // Log de la búsqueda
      const context = await this.vectorStoreService.search(question, 5); // Busca los 5 documentos más relevantes
      console.log('Contexto encontrado:', context); // Log del contexto
      const contextString = context.map(doc => doc.content).join('\n');
      console.log('Contexto formateado:', contextString); // Log del contexto formateado

      // Crear el historial de chat en el formato que espera OpenAI
      const messages: ChatMessage[] =
      [
        ...this.chat_history,
        { role: 'user', content: `Context: ${contextString}\nQuestion: ${question}` },
      ];
      console.log('Mensajes enviados a OpenAI:', messages); // Log de los mensajes

      // Obtener la respuesta del modelo de OpenAI
      console.log('Enviando solicitud a OpenAI...'); // Log de la solicitud
      const aiResponse = await this.openaiModel.chat(messages);
      console.log('Respuesta de OpenAI:', aiResponse); // Log de la respuesta

      // Actualizar el historial de chat
      this.chat_history.push(
        { role: 'user', content: question },
        { role: 'assistant', content: aiResponse },
      );
      console.log('Historial de chat actualizado:', this.chat_history); // Log del historial

      // Limitar el historial de chat a 10 mensajes
      if (this.chat_history.length > 10)
      {
        console.log('Limpiando historial de chat...'); // Log de la limpieza
        this.chat_history.shift();
      }

      // Devolver la conversación
      const conversation: ChatMessage[] = [
        { role: 'user', content: question },
        { role: 'assistant', content: aiResponse },
      ];

      console.log('Conversación devuelta:', conversation); // Log de la conversación

    return conversation;
    }
    catch (ex)
    {
      console.error(ex);
      throw ex;
    }
  }
}
