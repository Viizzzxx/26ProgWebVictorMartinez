import { PedidoRepository } from "./infrastructure/PedidoRepository";
import { PedidoService } from "./application/PedidoService";
import { manejarRutasPedidos, respuestaJSON } from "./interfaces/pedidoRoutes";

// Composition Root: crear instancias e inyectar dependencias
const repository = new PedidoRepository();
const service = new PedidoService(repository);

const PORT = Number(process.env.PORT) || 3003;

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
        mensaje: "Backend de pedidos funcionando correctamente",
        servicio: "backend-orders",
        entidad: "pedidos",
        puerto: PORT,
      });
    }

    if (req.method === "GET" && url.pathname === "/health") {
      return respuestaJSON({ status: "ok", service: "backend-orders" });
    }

    return await manejarRutasPedidos(req, service);
  },
});

console.log(`Backend de pedidos corriendo en http://localhost:${PORT}`);