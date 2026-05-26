import type { Producto } from "../domain/Producto";
import { ProductoRepository } from "../infrastructure/ProductoRepository";

export class ProductoService {
  private repository: ProductoRepository;

  constructor() {
    this.repository = new ProductoRepository();
  }

  async listarProductos(): Promise<Producto[]> {
    return await this.repository.obtenerTodos();
  }

  async buscarProducto(id: number): Promise<Producto | null> {
    return await this.repository.obtenerPorId(id);
  }

  async crearProducto(data: Producto): Promise<Producto> {
    if (!data.nombre || data.precio === undefined || data.stock === undefined) {
      throw new Error("El nombre, precio y stock son obligatorios");
    }

    if (Number(data.precio) < 0 || Number(data.stock) < 0) {
      throw new Error("El precio y el stock no pueden ser negativos");
    }

    return await this.repository.crear({
      nombre: data.nombre,
      precio: Number(data.precio),
      stock: Number(data.stock),
    });
  }

  async actualizarProducto(id: number, data: Producto): Promise<Producto | null> {
    if (!data.nombre || data.precio === undefined || data.stock === undefined) {
      throw new Error("El nombre, precio y stock son obligatorios");
    }

    if (Number(data.precio) < 0 || Number(data.stock) < 0) {
      throw new Error("El precio y el stock no pueden ser negativos");
    }

    return await this.repository.actualizar(id, {
      nombre: data.nombre,
      precio: Number(data.precio),
      stock: Number(data.stock),
    });
  }

  async eliminarProducto(id: number): Promise<boolean> {
    return await this.repository.eliminar(id);
  }
}