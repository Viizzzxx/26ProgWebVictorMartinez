interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  fecha_creacion?: string;
}

const API_URL = "http://localhost:3002/productos";

const formProducto = document.getElementById("formProducto") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputStock = document.getElementById("stock") as HTMLInputElement;
const tablaProductos = document.getElementById("tablaProductos") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

async function cargarProductos(): Promise<void> {
  try {
    const respuesta = await fetch(API_URL);
    const productos: Producto[] = await respuesta.json();

    tablaProductos.innerHTML = "";

    productos.forEach((producto) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${Number(producto.precio).toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn-eliminar" data-id="${producto.id}">
            Eliminar
          </button>
        </td>
      `;

      tablaProductos.appendChild(fila);
    });
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudieron cargar los productos");
  }
}

async function crearProducto(nombre: string, precio: number, stock: number): Promise<void> {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, precio, stock }),
    });

    if (!respuesta.ok) {
      throw new Error("Error al guardar producto");
    }

    mostrarMensaje("Producto guardado correctamente");
    formProducto.reset();
    await cargarProductos();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo guardar el producto");
  }
}

async function eliminarProducto(id: number): Promise<void> {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("Error al eliminar producto");
    }

    mostrarMensaje("Producto eliminado correctamente");
    await cargarProductos();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo eliminar el producto");
  }
}

function mostrarMensaje(texto: string): void {
  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
  }, 3000);
}

formProducto.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const precio = Number(inputPrecio.value);
  const stock = Number(inputStock.value);

  if (!nombre || Number.isNaN(precio) || Number.isNaN(stock)) {
    mostrarMensaje("Todos los campos son obligatorios");
    return;
  }

  if (precio < 0 || stock < 0) {
    mostrarMensaje("El precio y el stock no pueden ser negativos");
    return;
  }

  await crearProducto(nombre, precio, stock);
});

tablaProductos.addEventListener("click", async (event) => {
  const elemento = event.target as HTMLElement;

  if (elemento.classList.contains("btn-eliminar")) {
    const id = Number(elemento.dataset.id);

    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      await eliminarProducto(id);
    }
  }
});

cargarProductos();
export {};