import { Injectable } from "@nestjs/common";

import { EnvService } from "@/infra/env/env.service";
import { Document, IVectorStore, VectorDocument } from "@/rag/vector-store/interfaces/vector-store.interface";

import { ConnectionDB } from "./connectionDB";

@Injectable()
export class PostgresVectorStore implements IVectorStore
{
    private readonly db: ConnectionDB;

    constructor(private readonly env: EnvService)
    {
        this.db = ConnectionDB.getInstance(this.env);
    }

    async addDocuments(docs: VectorDocument[], table: string): Promise<void>
    {
        const clientSql = await this.db.getConnection();

        for (const doc of docs)
        {
            const query = {
                text: `INSERT INTO ${table} (content, metadata, vector) VALUES ($1, $2, $3)`,
                values: [doc.content, doc.metadata, doc.vector],
            };

            await clientSql.query(query);
        }

        clientSql.release();
    }

    async search(query: number[], k: number, table: string): Promise<Document[]>
    {
        const clientSql = await this.db.getConnection();

        const vectorQuery = JSON.stringify(query);

        // Realizar una búsqueda de similitud de vectores
        const querySearch = {
            text: `SELECT content, metadata FROM ${table} ORDER BY vector <-> $1 LIMIT $2`,
            values: [vectorQuery, k],
        };

        const result = await clientSql.query(querySearch);

        clientSql.release();

        return result.rows;
    }
}
