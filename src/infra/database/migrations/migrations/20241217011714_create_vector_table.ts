import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>)
{
    // Crear la tabla con el campo vector
    await db.schema
        .createTable("collection_anuncios")
        .ifNotExists()
        .addColumn("id", "serial", (col) => col.primaryKey())
        .addColumn("content", "text", (col) => col.notNull())
        .addColumn("metadata", "jsonb")
        .addColumn("vector", sql`VECTOR(768)`, (col) => col.notNull())
        .execute();

    // Crear índices si es necesario
    await db.schema.createIndex("idx_vector_content").on("collection_anuncios").column("content").execute();

    await db.schema.createIndex("idx_vector_metadata").on("collection_anuncios").column("metadata").execute();
}

export async function down(db: Kysely<any>)
{
    // Eliminar índices
    await db.schema.dropIndex("idx_vector_content").execute();
    await db.schema.dropIndex("idx_vector_metadata").execute();

    // Eliminar la tabla
    await db.schema.dropTable("collection_anuncios").execute();
}
