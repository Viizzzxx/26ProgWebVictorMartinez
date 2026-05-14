import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5433,
    user: "admin",
    password: "admin123",
    database: "escuela",
});

async function obtenerUsuarios() {
    const result = await client.query(
        "SELECT * FROM usuarios ORDER BY id"
    );

    return result.rows;
}

async function insertarUsuario(nombre: string) {
    await client.query(
        "INSERT INTO usuarios(nombre) VALUES($1)",
        [nombre]
    );
}

async function buscarUsuarioPorId(id: number) {
    const result = await client.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );

    return result.rows;
}

async function main() {
    try {
        await client.connect();

        console.log("Conexión exitosa a PostgreSQL");

        await insertarUsuario("Pedro");

        const usuarios = await obtenerUsuarios();

        console.log("\nUsuarios registrados:");
        console.log(usuarios);

        const usuarioEncontrado = await buscarUsuarioPorId(1);

        console.log("\nUsuario encontrado por ID:");
        console.log(usuarioEncontrado);

    } catch (error) {
        console.error("Error al conectar:", error);

    } finally {
        await client.end();
    }
}

main();