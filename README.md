# 📝 API REST - Blogs (Node.js + PostgreSQL)

API REST ligera que permite gestionar publicaciones, comentarios, autores, likes y categorías, utilizando **Express** y **pg-promise** para interactuar con PostgreSQL.

---

## 🚀 Estructura

```plaintext
/
├── config/conexion.js         # Conexión a PostgreSQL
├── controllers/blogs.controller.js  # Lógica de endpoints y consultas SQL
└── routes/index.js           # Rutas configuradas para cada operación
```
## 📌 Endpoints principales


| Método  | Ruta     | Descripción                                   | Parámetros clave                                             |
|:-------:|:---------|:----------------------------------------------|:------------------------------------------------------------|
| **POST**    | `/blogs`  | Crear un nuevo comentario                     | ⚙️ `pub_id` (body) – ID publicación, `aut_id` (body) – ID autor, `descripcion` (body) – texto del comentario |
| **PUT**     | `/blogs`  | Actualizar un comentario existente            | ⚙️ `pub_id`, `aut_id`, `descripcion` (todos en query) |
| **DELETE**  | `/blogs`  | Eliminar un comentario por su ID             | ⚙️ `com_id` (query) – ID del comentario |
| **GET**     | `/blogs`  | Consultas avanzadas (joins, conteos, likes…) | — (sin parámetros) |

