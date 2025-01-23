import { InternalServerErrorException } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { VectorDatabasesType } from '../types/vector-databases.type';
import { PGVectorService } from './pgvector-vector-db.service';

export function createVectorDatabase(type: VectorDatabasesType, env: EnvService)
{
  if (type === 'PGVECTOR')
  {
    return new PGVectorService(env);
  }
  else
  {
    throw new InternalServerErrorException(`Invalid vector store type: ${type}`);
  }
}
