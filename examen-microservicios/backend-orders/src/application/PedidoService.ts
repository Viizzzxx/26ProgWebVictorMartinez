import type { Pedido } from "../domain/Pedido";
import { PedidoRepository } from "../infrastructure/PedidoRepository";

export class PedidoService {
  private repository: PedidoRepository;

  constructor() {
    this.repository = new PedidoRepository();
  }

  async listarPedidos(): Promise<Pedido[]> {
    return await this.repository.obtenerTodos();
  }

  async buscarPedido(id: number): Promise<Pedido | null> {
    return await this.repository.obtenerPorId(id);
  }

  async crearPedido(data: Pedido): Promise<Pedido> {
    if (!data.nombre_usuario || !data.nombre_producto || data.cantidad === undefined) {
      throw new Error("El usuario, producto y cantidad son obligatorios");
    }

    if (Number(data.cantidad) <= 0) {
      throw new Error("La cantidad debe ser mayor a cero");
    }

    return await this.repository.crear({
      nombre_usuario: data.nombre_usuario,
      nombre_producto: data.nombre_producto,
      cantidad: Number(data.cantidad),
    });
  }

  async actualizarPedido(id: number, data: Pedido): Promise<Pedido | null> {
    if (!data.nombre_usuario || !data.nombre_producto || data.cantidad === undefined) {
      throw new Error("El usuario, producto y cantidad son obligatorios");
    }

    if (Number(data.cantidad) <= 0) {
      throw new Error("La cantidad debe ser mayor a cero");
    }

    return await this.repository.actualizar(id, {
      nombre_usuario: data.nombre_usuario,
      nombre_producto: data.nombre_producto,
      cantidad: Number(data.cantidad),
    });
  }

  async eliminarPedido(id: number): Promise<boolean> {
    return await this.repository.eliminar(id);
  }
}