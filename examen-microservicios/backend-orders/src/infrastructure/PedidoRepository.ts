import { pool } from "./db";
import type { Pedido } from "../domain/Pedido";
import type { IPedidoRepository } from "../domain/IPedidoRepository";

export class PedidoRepository implements IPedidoRepository {
  async obtenerTodos(): Promise<Pedido[]> {
    const resultado = await pool.query(
      "SELECT id, nombre_usuario, nombre_producto, cantidad, fecha_creacion FROM pedidos ORDER BY id ASC"
    );

    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Pedido | null> {
    const resultado = await pool.query(
      "SELECT id, nombre_usuario, nombre_producto, cantidad, fecha_creacion FROM pedidos WHERE id = $1",
      [id]
    );

    return resultado.rows[0] || null;
  }

  async crear(pedido: Pedido): Promise<Pedido> {
    const resultado = await pool.query(
      "INSERT INTO pedidos (nombre_usuario, nombre_producto, cantidad) VALUES ($1, $2, $3) RETURNING id, nombre_usuario, nombre_producto, cantidad, fecha_creacion",
      [pedido.nombre_usuario, pedido.nombre_producto, pedido.cantidad]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, pedido: Pedido): Promise<Pedido | null> {
    const resultado = await pool.query(
      "UPDATE pedidos SET nombre_usuario = $1, nombre_producto = $2, cantidad = $3 WHERE id = $4 RETURNING id, nombre_usuario, nombre_producto, cantidad, fecha_creacion",
      [pedido.nombre_usuario, pedido.nombre_producto, pedido.cantidad, id]
    );

    return resultado.rows[0] || null;
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM pedidos WHERE id = $1",
      [id]
    );

    return (resultado.rowCount || 0) > 0;
  }
}