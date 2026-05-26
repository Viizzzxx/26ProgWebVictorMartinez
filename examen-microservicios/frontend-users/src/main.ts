interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fecha_creacion?: string;
}

const API_URL = "http://localhost:3001/usuarios";

const formUsuario = document.getElementById("formUsuario") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputCorreo = document.getElementById("correo") as HTMLInputElement;
const tablaUsuarios = document.getElementById("tablaUsuarios") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

async function cargarUsuarios(): Promise<void> {
  try {
    const respuesta = await fetch(API_URL);
    const usuarios: Usuario[] = await respuesta.json();

    tablaUsuarios.innerHTML = "";

    usuarios.forEach((usuario) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>
          <button class="btn-eliminar" data-id="${usuario.id}">
            Eliminar
          </button>
        </td>
      `;

      tablaUsuarios.appendChild(fila);
    });
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudieron cargar los usuarios");
  }
}

async function crearUsuario(nombre: string, correo: string): Promise<void> {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, correo }),
    });

    if (!respuesta.ok) {
      throw new Error("Error al guardar usuario");
    }

    mostrarMensaje("Usuario guardado correctamente");
    formUsuario.reset();
    await cargarUsuarios();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo guardar el usuario");
  }
}

async function eliminarUsuario(id: number): Promise<void> {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("Error al eliminar usuario");
    }

    mostrarMensaje("Usuario eliminado correctamente");
    await cargarUsuarios();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo eliminar el usuario");
  }
}

function mostrarMensaje(texto: string): void {
  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
  }, 3000);
}

formUsuario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const correo = inputCorreo.value.trim();

  if (!nombre || !correo) {
    mostrarMensaje("Todos los campos son obligatorios");
    return;
  }

  await crearUsuario(nombre, correo);
});

tablaUsuarios.addEventListener("click", async (event) => {
  const elemento = event.target as HTMLElement;

  if (elemento.classList.contains("btn-eliminar")) {
    const id = Number(elemento.dataset.id);

    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      await eliminarUsuario(id);
    }
  }
});

cargarUsuarios();
export {};