import { conectarDB } from "./db";
import { rutasUsuarios } from "./usuarios.routes";

await conectarDB();

const server = Bun.serve({
    port: 3000,

    async fetch(req) {
        const url = new URL(req.url);
        const method = req.method;

        console.log(`${method} ${url.pathname}`);

        if (url.pathname === "/" && method === "GET") {
            return Response.json({
                mensaje: "API REST funcionando",
                rutas: [
                    "GET /health",
                    "GET /usuarios",
                    "GET /usuarios/:id",
                    "POST /usuarios",
                    "PUT /usuarios/:id",
                    "DELETE /usuarios/:id"
                ]
            });
        }

        if (url.pathname === "/health" && method === "GET") {
            return Response.json({
                status: "OK",
                mensaje: "El microservicio está funcionando"
            });
        }

        const respuesta = await rutasUsuarios(req, url);

        if (respuesta) {
            return respuesta;
        }

        return Response.json(
            { mensaje: "Ruta no encontrada" },
            { status: 404 }
        );
    },
});

console.log(`Servidor ejecutándose en http://localhost:${server.port}`);