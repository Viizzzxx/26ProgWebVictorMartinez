import type { UsuarioService } from "../application/UsuarioService";

export async function manejarRutasUsuarios(
  req: Request,
  service: UsuarioService
): Promise<Response> {
  const url = new URL(req.url);
  const metodo = req.method;
  const partes = url.pathname.split("/").filter(Boolean);

  if (partes[0] !== "usuarios") {
    return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
  }

  try {
    if (metodo === "GET" && partes.length === 1) {
      const usuarios = await service.listarUsuarios();
      return respuestaJSON(usuarios);
    }

    if (metodo === "GET" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const usuario = await service.buscarUsuario(id);

      if (!usuario) {
        return respuestaJSON({ mensaje: "Usuario no encontrado" }, 404);
      }

      return respuestaJSON(usuario);
    }

    if (metodo === "POST" && partes.length === 1) {
      const body = await req.json();
      const nuevoUsuario = await service.crearUsuario(body);

      return respuestaJSON(nuevoUsuario, 201);
    }

    if (metodo === "PUT" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const body = await req.json();
      const usuarioActualizado = await service.actualizarUsuario(id, body);

      if (!usuarioActualizado) {
        return respuestaJSON({ mensaje: "Usuario no encontrado" }, 404);
      }

      return respuestaJSON(usuarioActualizado);
    }

    if (metodo === "DELETE" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const eliminado = await service.eliminarUsuario(id);

      if (!eliminado) {
        return respuestaJSON({ mensaje: "Usuario no encontrado" }, 404);
      }

      return respuestaJSON({ mensaje: "Usuario eliminado correctamente" });
    }

    return respuestaJSON({ mensaje: "Método no permitido" }, 405);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error interno del servidor";
    return respuestaJSON({ error: mensaje }, 500);
  }
}

export function respuestaJSON(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}