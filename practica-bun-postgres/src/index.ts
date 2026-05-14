import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5433,
    user: "admin",
    password: "admin123",
    database: "escuela",
});

async function main() {
    try {
        await client.connect();

        console.log("Conexión exitosa a PostgreSQL");

        const result = await client.query(
            "SELECT * FROM usuarios"
        );

        console.log("\nUsuarios registrados:");
        console.log(result.rows);

    } catch (error) {
        console.error("Error al conectar:", error);

    } finally {
        await client.end();
    }
}

main();