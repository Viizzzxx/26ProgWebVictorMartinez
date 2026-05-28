import type { Pedido } from "./Pedido";

export interface IPedidoRepository {
  obtenerTodos(): Promise<Pedido[]>;
  obtenerPorId(id: number): Promise<Pedido | null>;
  crear(pedido: Pedido): Promise<Pedido>;
  actualizar(id: number, pedido: Pedido): Promise<Pedido | null>;
  eliminar(id: number): Promise<boolean>;
}
