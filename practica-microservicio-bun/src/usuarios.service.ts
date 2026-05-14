import { client } from "./db";

export async function obtenerUsuarios() {
    const result = await client.query(
        "SELECT * FROM usuarios ORDER BY id"
    );

    return result.rows;
}

export async function obtenerUsuarioPorId(id: string) {
    const result = await client.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

export async function crearUsuario(nombre: string, email: string) {
    const result = await client.query(
        "INSERT INTO usuarios(nombre, email) VALUES($1, $2) RETURNING *",
        [nombre, email]
    );

    return result.rows[0];
}

export async function actualizarUsuario(id: string, nombre: string, email: string) {
    const result = await client.query(
        "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *",
        [nombre, email, id]
    );

    return result.rows[0];
}

export async function eliminarUsuario(id: string) {
    const result = await client.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
}