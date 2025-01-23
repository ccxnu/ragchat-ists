import { z } from 'zod'

export const envSchema = z.object(
  {
    // Global
    GLOBAL_PREFIX: z.string(),
    NODE_ENV: z.string(),

    // Database
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_HOST: z.string(),

    // Redis
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_TTL: z.coerce.number(),
    REDIS_DB: z.coerce.number(),

    // Jwt
    JWT_ACCESS_TOKEN_TIME: z.coerce.number(),
    JWT_SECRET_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),

    // Email
    EMAIL_SENDER: z.string(),

    // Ollama
    OLLAMA_MODEL_CHAT: z.string(),
    OLLAMA_URL: z.string(),
    OLLAMA_EMBEDDING_MODEL: z.string(),
    DEEPSEEK_URL: z.string(),
    DEEPSEEK_API: z.string(),
    DEEPSEEK_MODEL: z.string(),
  }
)

export type Env = z.infer<typeof envSchema>
