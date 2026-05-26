import { ProductoService } from "../application/ProductoService";

const productoService = new ProductoService();

export async function manejarRutasProductos(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const metodo = req.method;
  const partes = url.pathname.split("/").filter(Boolean);

  if (partes[0] !== "productos") {
    return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
  }

  try {
    if (metodo === "GET" && partes.length === 1) {
      const productos = await productoService.listarProductos();
      return respuestaJSON(productos);
    }

    if (metodo === "GET" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const producto = await productoService.buscarProducto(id);

      if (!producto) {
        return respuestaJSON({ mensaje: "Producto no encontrado" }, 404);
      }

      return respuestaJSON(producto);
    }

    if (metodo === "POST" && partes.length === 1) {
      const body = await req.json();
      const nuevoProducto = await productoService.crearProducto(body);

      return respuestaJSON(nuevoProducto, 201);
    }

    if (metodo === "PUT" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const body = await req.json();
      const productoActualizado = await productoService.actualizarProducto(id, body);

      if (!productoActualizado) {
        return respuestaJSON({ mensaje: "Producto no encontrado" }, 404);
      }

      return respuestaJSON(productoActualizado);
    }

    if (metodo === "DELETE" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const eliminado = await productoService.eliminarProducto(id);

      if (!eliminado) {
        return respuestaJSON({ mensaje: "Producto no encontrado" }, 404);
      }

      return respuestaJSON({ mensaje: "Producto eliminado correctamente" });
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