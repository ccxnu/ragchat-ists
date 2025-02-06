import { Injectable } from "@nestjs/common";
import { Pool, PoolConfig } from "pg";

import { EnvService } from "@/infra/env/env.service";

@Injectable()
export class ConnectionDB
{
    private static instance: ConnectionDB;
    private pool?: Pool;

    constructor(private readonly env: EnvService)
    {
        this.connect();
    }

    private connect()
    {
        const host = this.env.get("DATABASE_HOST");
        const port = this.env.get("DATABASE_PORT");
        const user = this.env.get("DATABASE_USER");
        const password = this.env.get("DATABASE_PASSWORD");
        const database = this.env.get("DATABASE_NAME");

        const config: PoolConfig = {
            host,
            port,
            user,
            password,
            database,
            max: 50, // Número máximo de conexiones en el pool
            idleTimeoutMillis: 30000, // Tiempo de inactividad antes de cerrar una conexión
            connectionTimeoutMillis: 2000, // Tiempo máximo para establecer una conexión
        };

        this.pool = new Pool(config);
    }

    // Método estático para obtener la instancia única (Singleton)
    static getInstance(env: EnvService): ConnectionDB
    {
        if (!ConnectionDB.instance) ConnectionDB.instance = new ConnectionDB(env);
        return ConnectionDB.instance;
    }

    // Obtener una conexión del pool
    async getConnection()
    {
        if (!this.pool) throw new Error("Database pool is not initialized");
        return this.pool.connect();
    }

    // Cerrar el pool de conexiones
    async close()
    {
        if (this.pool) await this.pool.end();
    }
}
