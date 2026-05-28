import { UsuarioRepository } from "./infrastructure/UsuarioRepository";
import { UsuarioService } from "./application/UsuarioService";
import { manejarRutasUsuarios, respuestaJSON } from "./interfaces/usuarioRoutes";

// Composition Root: crear instancias e inyectar dependencias
const repository = new UsuarioRepository();
const service = new UsuarioService(repository);

const PORT = Number(process.env.PORT) || 3001;

Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",

  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/") {
      return respuestaJSON({
        mensaje: "Backend de usuarios funcionando correctamente",
        servicio: "backend-users",
        entidad: "usuarios",
        puerto: PORT,
      });
    }

    if (req.method === "GET" && url.pathname === "/health") {
      return respuestaJSON({ status: "ok", service: "backend-users" });
    }

    return await manejarRutasUsuarios(req, service);
  },
});

console.log(`Backend de usuarios corriendo en http://localhost:${PORT}`);