import { pool } from "./db";
import type { Producto } from "../domain/Producto";

export class ProductoRepository {
  async obtenerTodos(): Promise<Producto[]> {
    const resultado = await pool.query(
      "SELECT id, nombre, precio, stock, fecha_creacion FROM productos ORDER BY id ASC"
    );

    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Producto | null> {
    const resultado = await pool.query(
      "SELECT id, nombre, precio, stock, fecha_creacion FROM productos WHERE id = $1",
      [id]
    );

    return resultado.rows[0] || null;
  }

  async crear(producto: Producto): Promise<Producto> {
    const resultado = await pool.query(
      "INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING id, nombre, precio, stock, fecha_creacion",
      [producto.nombre, producto.precio, producto.stock]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, producto: Producto): Promise<Producto | null> {
    const resultado = await pool.query(
      "UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING id, nombre, precio, stock, fecha_creacion",
      [producto.nombre, producto.precio, producto.stock, id]
    );

    return resultado.rows[0] || null;
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM productos WHERE id = $1",
      [id]
    );

    return (resultado.rowCount || 0) > 0;
  }
}