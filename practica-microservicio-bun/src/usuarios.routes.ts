import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "./usuarios.service";

async function leerBody(req: Request) {
    try {
        return await req.json() as {
            nombre?: string;
            email?: string;
        };
    } catch (error) {
        return null;
    }
}

function datosValidos(nombre?: string, email?: string) {
    if (!nombre || !email) {
        return false;
    }

    return true;
}

export async function rutasUsuarios(req: Request, url: URL) {
    const method = req.method;

    if (url.pathname === "/usuarios" && method === "GET") {
        const usuarios = await obtenerUsuarios();
        return Response.json(usuarios);
    }

    if (url.pathname.startsWith("/usuarios/") && method === "GET") {
        const id = url.pathname.split("/")[2];

        if (!id) {
            return Response.json(
                { mensaje: "ID no válido" },
                { status: 400 }
            );
        }

        const usuario = await obtenerUsuarioPorId(id);

        if (!usuario) {
            return Response.json(
                { mensaje: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        return Response.json(usuario);
    }

    if (url.pathname === "/usuarios" && method === "POST") {
        const body = await leerBody(req);

        if (!body) {
            return Response.json(
                { mensaje: "El JSON enviado no es válido" },
                { status: 400 }
            );
        }

        if (!datosValidos(body.nombre, body.email)) {
            return Response.json(
                { mensaje: "El nombre y el email son obligatorios" },
                { status: 400 }
            );
        }

        const usuario = await crearUsuario(body.nombre!, body.email!);

        return Response.json(usuario, { status: 201 });
    }

    if (url.pathname.startsWith("/usuarios/") && method === "PUT") {
        const id = url.pathname.split("/")[2];

        if (!id) {
            return Response.json(
                { mensaje: "ID no válido" },
                { status: 400 }
            );
        }

        const body = await leerBody(req);

        if (!body) {
            return Response.json(
                { mensaje: "El JSON enviado no es válido" },
                { status: 400 }
            );
        }

        if (!datosValidos(body.nombre, body.email)) {
            return Response.json(
                { mensaje: "El nombre y el email son obligatorios" },
                { status: 400 }
            );
        }

        const usuario = await actualizarUsuario(id, body.nombre!, body.email!);

        if (!usuario) {
            return Response.json(
                { mensaje: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        return Response.json(usuario);
    }

    if (url.pathname.startsWith("/usuarios/") && method === "DELETE") {
        const id = url.pathname.split("/")[2];

        if (!id) {
            return Response.json(
                { mensaje: "ID no válido" },
                { status: 400 }
            );
        }

        const usuario = await eliminarUsuario(id);

        if (!usuario) {
            return Response.json(
                { mensaje: "Usuario no encontrado" },
                { status: 404 }     
            );
        }

        return Response.json({
            mensaje: "Usuario eliminado correctamente",
            usuario
        });
    }

    return null;
}