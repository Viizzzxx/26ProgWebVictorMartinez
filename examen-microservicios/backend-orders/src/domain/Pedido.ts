export interface Pedido {
  id?: number;
  nombre_usuario: string;
  nombre_producto: string;
  cantidad: number;
  fecha_creacion?: Date;
}