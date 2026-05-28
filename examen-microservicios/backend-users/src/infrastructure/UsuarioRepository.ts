import { pool } from "./db";
import type { Usuario } from "../domain/Usuario";
import type { IUsuarioRepository } from "../domain/IUsuarioRepository";

export class UsuarioRepository implements IUsuarioRepository {
  async obtenerTodos(): Promise<Usuario[]> {
    const resultado = await pool.query(
      "SELECT id, nombre, correo, fecha_creacion FROM usuarios ORDER BY id ASC"
    );

    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Usuario | null> {
    const resultado = await pool.query(
      "SELECT id, nombre, correo, fecha_creacion FROM usuarios WHERE id = $1",
      [id]
    );

    return resultado.rows[0] || null;
  }

  async crear(usuario: Usuario): Promise<Usuario> {
    const resultado = await pool.query(
      "INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING id, nombre, correo, fecha_creacion",
      [usuario.nombre, usuario.correo]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, usuario: Usuario): Promise<Usuario | null> {
    const resultado = await pool.query(
      "UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING id, nombre, correo, fecha_creacion",
      [usuario.nombre, usuario.correo, id]
    );

    return resultado.rows[0] || null;
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    );

    return (resultado.rowCount || 0) > 0;
  }
}