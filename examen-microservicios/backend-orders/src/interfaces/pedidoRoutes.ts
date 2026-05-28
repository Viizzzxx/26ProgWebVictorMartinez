import type { PedidoService } from "../application/PedidoService";

export async function manejarRutasPedidos(
  req: Request,
  service: PedidoService
): Promise<Response> {
  const url = new URL(req.url);
  const metodo = req.method;
  const partes = url.pathname.split("/").filter(Boolean);

  if (partes[0] !== "pedidos") {
    return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
  }

  try {
    if (metodo === "GET" && partes.length === 1) {
      const pedidos = await service.listarPedidos();
      return respuestaJSON(pedidos);
    }

    if (metodo === "GET" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const pedido = await service.buscarPedido(id);

      if (!pedido) {
        return respuestaJSON({ mensaje: "Pedido no encontrado" }, 404);
      }

      return respuestaJSON(pedido);
    }

    if (metodo === "POST" && partes.length === 1) {
      const body = await req.json();
      const nuevoPedido = await service.crearPedido(body);

      return respuestaJSON(nuevoPedido, 201);
    }

    if (metodo === "PUT" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const body = await req.json();
      const pedidoActualizado = await service.actualizarPedido(id, body);

      if (!pedidoActualizado) {
        return respuestaJSON({ mensaje: "Pedido no encontrado" }, 404);
      }

      return respuestaJSON(pedidoActualizado);
    }

    if (metodo === "DELETE" && partes.length === 2) {
      const id = Number(partes[1]);

      if (Number.isNaN(id)) {
        return respuestaJSON({ mensaje: "ID inválido" }, 400);
      }

      const eliminado = await service.eliminarPedido(id);

      if (!eliminado) {
        return respuestaJSON({ mensaje: "Pedido no encontrado" }, 404);
      }

      return respuestaJSON({ mensaje: "Pedido eliminado correctamente" });
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