import { Injectable, Logger } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { DocumentDB, VectorDocument } from '../interfaces/document';
import { IVectorStore } from '../interfaces/vector-database.interface';
import { ConnectionDB } from './pg-connection-db';

const COLLECTION_NAME = 'collection_anuncios';

@Injectable()
export class PGVectorService implements IVectorStore
{
  private readonly logger = new Logger(PGVectorService.name);
  private readonly db: ConnectionDB;

  constructor(private readonly env: EnvService)
  {
    this.db = ConnectionDB.getInstance(this.env);
  }

  async addDocuments(docs: VectorDocument[]): Promise<void>
  {
    const clientSql = await this.db.getConnection();

    try
    {
      for (const doc of docs)
      {
        const query =
        {
          text: `INSERT INTO ${COLLECTION_NAME} (content, metadata, vector) VALUES ($1, $2, $3)`,
          values: [doc.content, doc.metadata, doc.vector],
        };

        await clientSql.query(query);
        this.logger.log('Document inserted successfully');
      }
    }
    catch (error)
    {
      this.logger.error('Failed to add documents', error);
      throw error;
    }
    finally
    {
        clientSql.release();
    }
  }

 async search(query: number[], k: number): Promise<DocumentDB[]>
 {
    const clientSql = await this.db.getConnection();

    try
    {
      const vectorQuery = JSON.stringify(query);

      // Realizar una búsqueda de similitud de vectores
      const querySearch =
      {
        text: `SELECT content, metadata FROM ${COLLECTION_NAME} ORDER BY vector <-> $1 LIMIT $2`,
        values: [vectorQuery, k],
      };

      const result = await clientSql.query(querySearch);
      this.logger.log('Search completed successfully');
      return result.rows;
    }
    catch (error)
    {
      this.logger.error('Failed to perform search', error);
      throw error;
    }
    finally
    {
      clientSql.release();
    }
  }
}
