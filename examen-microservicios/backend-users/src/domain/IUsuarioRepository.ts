import type { Usuario } from "./Usuario";

export interface IUsuarioRepository {
  obtenerTodos(): Promise<Usuario[]>;
  obtenerPorId(id: number): Promise<Usuario | null>;
  crear(usuario: Usuario): Promise<Usuario>;
  actualizar(id: number, usuario: Usuario): Promise<Usuario | null>;
  eliminar(id: number): Promise<boolean>;
}
