import type { Producto } from "./Producto";

export interface IProductoRepository {
  obtenerTodos(): Promise<Producto[]>;
  obtenerPorId(id: number): Promise<Producto | null>;
  crear(producto: Producto): Promise<Producto>;
  actualizar(id: number, producto: Producto): Promise<Producto | null>;
  eliminar(id: number): Promise<boolean>;
}
