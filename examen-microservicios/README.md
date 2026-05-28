# Examen Microservicios - Guía de URLs y Puertos

Este README sirve como referencia rápida para saber en qué URLs y puertos están corriendo los servicios del examen de microservicios.

---

## 1. Base de Datos PostgreSQL

| Servicio   | Puerto en Windows | Usuario | Base de Datos         |
| ---------- | ----------------- | ------- | --------------------- |
| PostgreSQL | 5434              | admin   | examen_microservicios |

---

## 2. Backends

| Servicio          | Puerto en Windows | URL para API / Prueba             |
| ----------------- | ----------------- | --------------------------------- |
| Backend Usuarios  | 3001              | `http://localhost:3001/usuarios`  |
| Backend Productos | 3002              | `http://localhost:3002/productos` |
| Backend Pedidos   | 3003              | `http://localhost:3003/pedidos`   |

---

## 3. Frontends

| Servicio           | Puerto en Windows | URL para navegador      |
| ------------------ | ----------------- | ----------------------- |
| Frontend Usuarios  | 5171              | `http://localhost:5171` |
| Frontend Productos | 5172              | `http://localhost:5172` |
| Frontend Pedidos   | 5173              | `http://localhost:5173` |

---

## 4. Notas importantes

1. Antes de abrir los frontends, asegúrate de que los **backends y la base de datos estén corriendo**.
2. Se recomienda levantar todos los servicios usando Docker Compose:

```bash
docker compose up -d --build
```
