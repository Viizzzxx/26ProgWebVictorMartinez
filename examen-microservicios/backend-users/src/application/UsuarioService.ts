import type { Usuario } from "../domain/Usuario";
import type { IUsuarioRepository } from "../domain/IUsuarioRepository";

export class UsuarioService {
  private repository: IUsuarioRepository;

  constructor(repository: IUsuarioRepository) {
    this.repository = repository;
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return await this.repository.obtenerTodos();
  }

  async buscarUsuario(id: number): Promise<Usuario | null> {
    return await this.repository.obtenerPorId(id);
  }

  async crearUsuario(data: Usuario): Promise<Usuario> {
    if (!data.nombre || !data.correo) {
      throw new Error("El nombre y el correo son obligatorios");
    }

    return await this.repository.crear(data);
  }

  async actualizarUsuario(id: number, data: Usuario): Promise<Usuario | null> {
    if (!data.nombre || !data.correo) {
      throw new Error("El nombre y el correo son obligatorios");
    }

    return await this.repository.actualizar(id, data);
  }

  async eliminarUsuario(id: number): Promise<boolean> {
    return await this.repository.eliminar(id);
  }
}