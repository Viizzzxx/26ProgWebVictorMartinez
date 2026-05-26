export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  fecha_creacion?: Date;
}