import { ProductoRepository } from "./infrastructure/ProductoRepository";
import { ProductoService } from "./application/ProductoService";
import { manejarRutasProductos, respuestaJSON } from "./interfaces/productoRoutes";

// Composition Root: crear instancias e inyectar dependencias
const repository = new ProductoRepository();
const service = new ProductoService(repository);

const PORT = Number(process.env.PORT) || 3002;

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
        mensaje: "Backend de productos funcionando correctamente",
        servicio: "backend-products",
        entidad: "productos",
        puerto: PORT,
      });
    }

    if (req.method === "GET" && url.pathname === "/health") {
      return respuestaJSON({ status: "ok", service: "backend-products" });
    }

    return await manejarRutasProductos(req, service);
  },
});

console.log(`Backend de productos corriendo en http://localhost:${PORT}`);