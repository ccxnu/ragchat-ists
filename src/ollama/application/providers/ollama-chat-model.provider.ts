// import { Provider } from '@nestjs/common';
// import { OLLAMA_CHAT_MODEL } from '../constants/ollama.constant';
// import { EnvService } from '@/infra/env/env.service';
//
// export const OllamaChatModelProvider: Provider =
// {
//   inject: [EnvService],
//   provide: OLLAMA_CHAT_MODEL,
//   useFactory: (env: EnvService) =>
//   {
//     const model = env.get('OLLAMA_MODEL_CHAT');
//
//     const llm = new Ollama({
//       //baseUrl: "http://128.0.0.1:11434",
//       model,
//       temperature: 0.3,         // Controla la aleatoriedad de las respuestas
//       streaming: false,         // Permite que las respuestas se generen y envíen en tiempo real,
//       numCtx: 4096,             // Define el tamaño del contexto que el modelo puede manejar
//       numPredict: 300,          // Longitud de respuesta moderada
//       topK: 50,                 // Limita la selección a los K tokens más probables
//       topP: 0.9,                // Nucleus sampling para diversidad controlada
//       repeatPenalty: 1.1,       // Penaliza la repetición de tokens en la salida
//       presencePenalty: 0.1,     // Penaliza tokens que ya han aparecido en la respuesta
//       frequencyPenalty: 0.1,    // Penaliza tokens en función de su frecuencia de aparición, igual
//       keepAlive: '5m',          // Mantener el modelo en memoria durante ...
//     });
//
//     return llm;
//   },
// };
