interface Pedido {
  id: number;
  nombre_usuario: string;
  nombre_producto: string;
  cantidad: number;
  fecha_creacion?: string;
}

const API_URL = "http://localhost:3003/pedidos";

const formPedido = document.getElementById("formPedido") as HTMLFormElement;
const inputNombreUsuario = document.getElementById("nombreUsuario") as HTMLInputElement;
const inputNombreProducto = document.getElementById("nombreProducto") as HTMLInputElement;
const inputCantidad = document.getElementById("cantidad") as HTMLInputElement;
const tablaPedidos = document.getElementById("tablaPedidos") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

async function cargarPedidos(): Promise<void> {
  try {
    const respuesta = await fetch(API_URL);
    const pedidos: Pedido[] = await respuesta.json();

    tablaPedidos.innerHTML = "";

    pedidos.forEach((pedido) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.nombre_usuario}</td>
        <td>${pedido.nombre_producto}</td>
        <td>${pedido.cantidad}</td>
        <td>
          <button class="btn-eliminar" data-id="${pedido.id}">
            Eliminar
          </button>
        </td>
      `;

      tablaPedidos.appendChild(fila);
    });
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudieron cargar los pedidos");
  }
}

async function crearPedido(
  nombre_usuario: string,
  nombre_producto: string,
  cantidad: number
): Promise<void> {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre_usuario, nombre_producto, cantidad }),
    });

    if (!respuesta.ok) {
      throw new Error("Error al guardar pedido");
    }

    mostrarMensaje("Pedido guardado correctamente");
    formPedido.reset();
    await cargarPedidos();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo guardar el pedido");
  }
}

async function eliminarPedido(id: number): Promise<void> {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("Error al eliminar pedido");
    }

    mostrarMensaje("Pedido eliminado correctamente");
    await cargarPedidos();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo eliminar el pedido");
  }
}

function mostrarMensaje(texto: string): void {
  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
  }, 3000);
}

formPedido.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre_usuario = inputNombreUsuario.value.trim();
  const nombre_producto = inputNombreProducto.value.trim();
  const cantidad = Number(inputCantidad.value);

  if (!nombre_usuario || !nombre_producto || Number.isNaN(cantidad)) {
    mostrarMensaje("Todos los campos son obligatorios");
    return;
  }

  if (cantidad <= 0) {
    mostrarMensaje("La cantidad debe ser mayor a cero");
    return;
  }

  await crearPedido(nombre_usuario, nombre_producto, cantidad);
});

tablaPedidos.addEventListener("click", async (event) => {
  const elemento = event.target as HTMLElement;

  if (elemento.classList.contains("btn-eliminar")) {
    const id = Number(elemento.dataset.id);

    if (confirm("¿Seguro que quieres eliminar este pedido?")) {
      await eliminarPedido(id);
    }
  }
});

cargarPedidos();
export {};