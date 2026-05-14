import { Client } from "pg";

export const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5434,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin123",
    database: process.env.DB_NAME || "escuela",
});

export async function conectarDB() {
    await client.connect();
    console.log("Conexión exitosa a PostgreSQL");
}