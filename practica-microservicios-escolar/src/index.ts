import { Client } from "pg";

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "escuela",
});

await client.connect();
console.log("Conectado a PostgreSQL");

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function leerBody(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

const server = Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    console.log(`${method} ${path}`);

    // Ruta para verificar que la API funciona
    if (path === "/health" && method === "GET") {
      return jsonResponse({
        status: "OK",
        mensaje: "API escolar funcionando correctamente",
      });
    }

    // ============================
    // MICROSERVICIO DE ALUMNOS
    // ============================

    // Obtener todos los alumnos
    if (path === "/alumnos" && method === "GET") {
      const result = await client.query(
        "SELECT * FROM alumnos ORDER BY id_alumno ASC"
      );

      return jsonResponse(result.rows);
    }

    // Obtener un alumno por ID
    if (path.startsWith("/alumnos/") && method === "GET") {
      const id = Number(path.split("/")[2]);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de alumno inválido" }, 400);
      }

      const result = await client.query(
        "SELECT * FROM alumnos WHERE id_alumno = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return jsonResponse({ error: "Alumno no encontrado" }, 404);
      }

      return jsonResponse(result.rows[0]);
    }

    // Crear alumno
    if (path === "/alumnos" && method === "POST") {
      const body = await leerBody(req);

      if (
        !body ||
        !body.nombre_completo ||
        !body.fecha_nacimiento ||
        !body.grado_curso ||
        !body.estado_matricula
      ) {
        return jsonResponse(
          { error: "Faltan datos obligatorios del alumno" },
          400
        );
      }

      const estadosValidos = ["Activo", "Inactivo", "Graduado"];

      if (!estadosValidos.includes(body.estado_matricula)) {
        return jsonResponse(
          { error: "El estado de matrícula no es válido" },
          400
        );
      }

      const result = await client.query(
        `INSERT INTO alumnos 
        (nombre_completo, fecha_nacimiento, grado_curso, estado_matricula)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
          body.nombre_completo,
          body.fecha_nacimiento,
          body.grado_curso,
          body.estado_matricula,
        ]
      );

      return jsonResponse(
        {
          mensaje: "Alumno creado correctamente",
          alumno: result.rows[0],
        },
        201
      );
    }

    // Actualizar alumno
    if (path.startsWith("/alumnos/") && method === "PUT") {
      const id = Number(path.split("/")[2]);
      const body = await leerBody(req);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de alumno inválido" }, 400);
      }

      if (
        !body ||
        !body.nombre_completo ||
        !body.fecha_nacimiento ||
        !body.grado_curso ||
        !body.estado_matricula
      ) {
        return jsonResponse(
          { error: "Faltan datos obligatorios para actualizar el alumno" },
          400
        );
      }

      const estadosValidos = ["Activo", "Inactivo", "Graduado"];

      if (!estadosValidos.includes(body.estado_matricula)) {
        return jsonResponse(
          { error: "El estado de matrícula no es válido" },
          400
        );
      }

      const result = await client.query(
        `UPDATE alumnos
        SET nombre_completo = $1,
            fecha_nacimiento = $2,
            grado_curso = $3,
            estado_matricula = $4
        WHERE id_alumno = $5
        RETURNING *`,
        [
          body.nombre_completo,
          body.fecha_nacimiento,
          body.grado_curso,
          body.estado_matricula,
          id,
        ]
      );

      if (result.rows.length === 0) {
        return jsonResponse({ error: "Alumno no encontrado" }, 404);
      }

      return jsonResponse({
        mensaje: "Alumno actualizado correctamente",
        alumno: result.rows[0],
      });
    }

    // Eliminar alumno
    if (path.startsWith("/alumnos/") && method === "DELETE") {
      const id = Number(path.split("/")[2]);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de alumno inválido" }, 400);
      }

      const result = await client.query(
        "DELETE FROM alumnos WHERE id_alumno = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return jsonResponse({ error: "Alumno no encontrado" }, 404);
      }

      return jsonResponse({
        mensaje: "Alumno eliminado correctamente",
        alumno: result.rows[0],
      });
    }

    // ============================
    // MICROSERVICIO DE MATRÍCULAS
    // ============================

    // Obtener todas las matrículas
    if (path === "/matriculas" && method === "GET") {
      const result = await client.query(`
        SELECT 
          m.id_matricula,
          m.fecha_matricula,
          m.estado_pago,
          a.id_alumno,
          a.nombre_completo,
          c.id_curso,
          c.nombre_curso,
          c.anio_escolar
        FROM matriculas m
        INNER JOIN alumnos a ON m.id_alumno = a.id_alumno
        INNER JOIN curso_escolar c ON m.id_curso = c.id_curso
        ORDER BY m.id_matricula ASC
      `);

      return jsonResponse(result.rows);
    }

    // Obtener matrícula por ID
    if (path.startsWith("/matriculas/") && method === "GET") {
      const id = Number(path.split("/")[2]);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de matrícula inválido" }, 400);
      }

      const result = await client.query(
        `
        SELECT 
          m.id_matricula,
          m.fecha_matricula,
          m.estado_pago,
          a.id_alumno,
          a.nombre_completo,
          c.id_curso,
          c.nombre_curso,
          c.anio_escolar
        FROM matriculas m
        INNER JOIN alumnos a ON m.id_alumno = a.id_alumno
        INNER JOIN curso_escolar c ON m.id_curso = c.id_curso
        WHERE m.id_matricula = $1
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return jsonResponse({ error: "Matrícula no encontrada" }, 404);
      }

      return jsonResponse(result.rows[0]);
    }

    // Crear matrícula
    if (path === "/matriculas" && method === "POST") {
      const body = await leerBody(req);

      if (
        !body ||
        !body.id_alumno ||
        !body.id_curso ||
        !body.fecha_matricula ||
        !body.estado_pago
      ) {
        return jsonResponse(
          { error: "Faltan datos obligatorios de la matrícula" },
          400
        );
      }

      const pagosValidos = ["Pagado", "Pendiente", "Parcial"];

      if (!pagosValidos.includes(body.estado_pago)) {
        return jsonResponse({ error: "Estado de pago no válido" }, 400);
      }

      const alumnoExiste = await client.query(
        "SELECT * FROM alumnos WHERE id_alumno = $1",
        [body.id_alumno]
      );

      if (alumnoExiste.rows.length === 0) {
        return jsonResponse({ error: "El alumno no existe" }, 404);
      }

      const cursoExiste = await client.query(
        "SELECT * FROM curso_escolar WHERE id_curso = $1",
        [body.id_curso]
      );

      if (cursoExiste.rows.length === 0) {
        return jsonResponse({ error: "El curso no existe" }, 404);
      }

      try {
        const result = await client.query(
          `INSERT INTO matriculas
          (id_alumno, id_curso, fecha_matricula, estado_pago)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
          [
            body.id_alumno,
            body.id_curso,
            body.fecha_matricula,
            body.estado_pago,
          ]
        );

        await client.query(
          `UPDATE curso_escolar
           SET cantidad_alumnos = cantidad_alumnos + 1
           WHERE id_curso = $1`,
          [body.id_curso]
        );

        return jsonResponse(
          {
            mensaje: "Matrícula creada correctamente",
            matricula: result.rows[0],
          },
          201
        );
      } catch {
        return jsonResponse(
          {
            error:
              "No se pudo registrar la matrícula. Puede que el alumno ya esté inscrito en ese curso.",
          },
          400
        );
      }
    }

    // Actualizar matrícula
    if (path.startsWith("/matriculas/") && method === "PUT") {
      const id = Number(path.split("/")[2]);
      const body = await leerBody(req);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de matrícula inválido" }, 400);
      }

      if (!body || !body.fecha_matricula || !body.estado_pago) {
        return jsonResponse(
          { error: "Faltan datos para actualizar la matrícula" },
          400
        );
      }

      const pagosValidos = ["Pagado", "Pendiente", "Parcial"];

      if (!pagosValidos.includes(body.estado_pago)) {
        return jsonResponse({ error: "Estado de pago no válido" }, 400);
      }

      const result = await client.query(
        `UPDATE matriculas
         SET fecha_matricula = $1,
             estado_pago = $2
         WHERE id_matricula = $3
         RETURNING *`,
        [body.fecha_matricula, body.estado_pago, id]
      );

      if (result.rows.length === 0) {
        return jsonResponse({ error: "Matrícula no encontrada" }, 404);
      }

      return jsonResponse({
        mensaje: "Matrícula actualizada correctamente",
        matricula: result.rows[0],
      });
    }

    // Eliminar matrícula
    if (path.startsWith("/matriculas/") && method === "DELETE") {
      const id = Number(path.split("/")[2]);

      if (isNaN(id)) {
        return jsonResponse({ error: "ID de matrícula inválido" }, 400);
      }

      const matricula = await client.query(
        "SELECT * FROM matriculas WHERE id_matricula = $1",
        [id]
      );

      if (matricula.rows.length === 0) {
        return jsonResponse({ error: "Matrícula no encontrada" }, 404);
      }

      const idCurso = matricula.rows[0].id_curso;

      const result = await client.query(
        "DELETE FROM matriculas WHERE id_matricula = $1 RETURNING *",
        [id]
      );

      await client.query(
        `UPDATE curso_escolar
         SET cantidad_alumnos = GREATEST(cantidad_alumnos - 1, 0)
         WHERE id_curso = $1`,
        [idCurso]
      );

      return jsonResponse({
        mensaje: "Matrícula eliminada correctamente",
        matricula: result.rows[0],
      });
    }

    return jsonResponse(
      {
        error: "Ruta no encontrada",
      },
      404
    );
  },
});

console.log(`Servidor corriendo en http://localhost:${server.port}`);