import { InternalServerErrorException } from "@nestjs/common";

import { EnvService } from "@/infra/env/env.service";
import { VectorDatabasesType } from "@/rag/vector-store/constant";
import { PostgresVectorStore } from "@/rag/vector-store/services/postgres/postgres";

export function createVectorDatabase(type: VectorDatabasesType, env: EnvService)
{
    if (type === "PGVECTOR")
    {
        return new PostgresVectorStore(env);
    }
    else
    {
        throw new InternalServerErrorException(`Invalid vector store type: ${type}`);
    }
}
