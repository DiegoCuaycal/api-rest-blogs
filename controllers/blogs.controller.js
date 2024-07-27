const pgPromise = require('pg-promise');
const config = {
    host: 'localhost',
    port: '5432',
    database: 'blogs', // cambios de la base
    user: 'postgres',
    password: 'Diego20'
}

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db

db.connect()
  .then(obj => {
    console.log('Conectado a la base de datos:', obj.client.database);
    obj.done(); // Cierra la conexión
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error.message);
  });



/* Ejercicio 2 */
const updateBlogs = async (req, res) => {
  const { descripcion, pub_id, aut_id } = req.query; 
  try {
    const response = await db.query(
      "UPDATE comentario SET com_descripcion = $1 WHERE pub_id= $2 AND aut_id = $3;",
      [descripcion, pub_id, aut_id]
    );

    res.json({
      message: "Comentario actualizada con éxito",
      body: {
        blogs: { descripcion, pub_id, aut_id },
      },
    });
  } catch (error) {
    res.json({
      message: "Error al actualizar el comentario",
      body: { error },
    });
  }
};

/* Ejercicio 3*/
const deleteBlogsbyId = async (req, res) => {
  const { com_id } = req.query;
  try {
    const response = await db.query(`DELETE FROM comentario WHERE com_id=$1`, [com_id]);
    res.json({
      message: "Comentario eliminado con exito",
    })
  } catch (error) {
    res.json({
      message: "Error al eliminar el comentario",
      body: { error },
    });
  }
};

/* Consulta Ejercicio 4 */
const getPublicacionComentario = async (req, res) => {
  try {
    const response = await db.any(`SELECT 
  publi.pub_id AS "Código publicación", 
  publi.pub_titulo AS "Título de publicación", 
  au.aut_usuario AS "Usuario del comentario", 
  com.com_descripcion AS "Comentario"
  FROM 
      publicacion publi
  JOIN 
      comentario com ON publi.pub_id = com.pub_id
  JOIN 
      autor au ON com.aut_id = au.aut_id;
  ;`)
    res.json(response)

  } catch (error) {
    res.json({
      message: "Error al obtener Publicaciones y Comentarios",
      error: error
    });
  }
}

/* Consulta Ejercicio 5*/
const getAutorPublicacion = async (req, res) => {
  try {
    const response = await db.any(`SELECT au.aut_usuario AS "Usuario",au.aut_nombre AS "Nombre del Usuario",pu.pub_titulo AS "Título de la Publicación",pu.pub_descripcion AS "Descripción de la Publicación" FROM publicacion pu INNER JOIN autor au ON au.aut_id = pu.aut_id;`)

    res.json(response)

  } catch (error) {
    res.json({
      message: "Error al obtener Autores y publicaciones",
      error: error
    });
  }
}

/*Consulta Ejercicio 6 */

const getComentarioPublicacion = async (req, res) => {
  const { pub_id } = req.query
  console.log("Id de la publicación: " + req.query)
  try {
      const response = await db.any(`SELECT 
      publicacion.pub_id,
      publicacion.pub_titulo,
      autor.aut_usuario,
      comentario.com_descripcion
      FROM comentario
      JOIN publicacion ON comentario.pub_id = publicacion.pub_id
      JOIN autor ON comentario.aut_id = autor.aut_id
      WHERE publicacion.pub_id = $1;`, [pub_id])
      res.json(response)

  } catch (error) {
      res.json({
          message: "Error al obtener comentarios de una publicación",
          error: error
      })
  }
}



/*Consulta Ejercicio 7 */

const getPublicacionesNumeroComentarios = async (req, res) => {
  try {
    const response = await db.any(`SELECT pu.pub_titulo AS "Título de la Publicación", COUNT(com.com_id) AS "Número de Comentarios" FROM publicacion pu LEFT JOIN comentario com ON com.pub_id = pu.pub_id GROUP BY pu.pub_id, pu.pub_titulo;`)
    res.json(response)
  }
  catch (error) {
    res.json({
      message: "Error al obtener Publicaciones y número de comentarios",
      error: error
    });
  }
}

/*Consulta Ejercicio 8 */

const getEjercicioOcho = async (req, res) => {
  const { pub_id } = req.query
  console.log("Id de la publicación: " + req.query)
  try {
      const response = await db.any(`SELECT 
          publicacion.pub_titulo,
          comentario.com_descripcion,
          COUNT(reaccion.rea_like) AS num_likes
      FROM 
          publicacion
      JOIN 
          comentario ON publicacion.pub_id = comentario.pub_id
      LEFT JOIN 
      reaccion ON comentario.com_id = reaccion.com_id AND reaccion.rea_like = TRUE
      WHERE 
          publicacion.pub_id = $1 GROUP BY publicacion.pub_titulo, comentario.com_descripcion;`, [pub_id])
      res.json(response)

  } catch (error) {
      res.json({
          message: "Error al obtener el Numero de Likes del comentario",
          error: error
      })
  }
}

/*Consulta Ejercicio 9 */
const getEjercicioNueve = async (req, res) => {
  try{
    const response = await db.any(`SELECT cat.cat_titulo AS categoria , pu.pub_titulo AS "Titulo de la Publicacion", com.com_descripcion AS "Comentario", COUNT(rea.rea_like) AS "Numero de Likes", COUNT(au.aut_id) AS "Numero de Autores" FROM categoria cat INNER JOIN publicacion pu ON cat.cat_id = pu.cat_id INNER JOIN comentario com ON pu.pub_id = com.pub_id INNER JOIN reaccion rea ON com.com_id = rea.com_id INNER JOIN autor au ON rea.aut_id = au.aut_id GROUP BY cat.cat_titulo,pu.pub_titulo,com.com_descripcion;`)
    res.json(response)
  }catch (error) {
    res.json({
      message: "Error al obtener datos de categorías, publicaciones, comentarios y likes.",
      error: error
    });
  }
}


/*Consulta Ejercicio 10 */

const getEjercicioDiez = async (req, res) => {
  try{
    const response = await db.any(`SELECT 
  au.aut_nombre AS "Nombre del Autor",
  cat.cat_titulo AS "Titulo de la Categoria",
  COUNT(DISTINCT pu.pub_id) AS "Numero de Publicaciones",  
  SUM(CASE WHEN rea.rea_like THEN 1 ELSE 0 END) AS "Cantidad de Likes"  
FROM 
  categoria cat 
INNER JOIN 
  publicacion pu ON cat.cat_id = pu.cat_id 
INNER JOIN 
  autor au ON pu.aut_id = au.aut_id 
LEFT JOIN 
  comentario com ON com.pub_id = pu.pub_id  
LEFT JOIN 
  reaccion rea ON com.com_id = rea.com_id 
GROUP BY 
  au.aut_nombre, 
  cat.cat_titulo;

`)
    res.json(response)

  }catch (error) {
    res.json({
      message: "Error al obtener datos de autores, categorías, número de publicaciones y likes",
      error: error
    });
  }
}




module.exports = {
  createComentario,
  updateBlogs,
  deleteBlogsbyId,
  getPublicacionComentario,
  getAutorPublicacion,
  getComentarioPublicacion,
  getPublicacionesNumeroComentarios,
  getEjercicioOcho,
  getEjercicioNueve,
  getEjercicioDiez


}
