const {Router} = require('express');
const router = Router();
const {createComentario, updateBlogs, deleteBlogsbyId, getPublicacionComentario,  getAutorPublicacion,getComentarioPublicacion, 
    getPublicacionesNumeroComentarios,getEjercicioOcho, getEjercicioNueve, getEjercicioDiez} = require('../controllers/blogs.controller');

/*Ejercicio 1 */
router.post('/blogs', createComentario);

/*Ejercicio 2 */
router.put('/blogs', updateBlogs);

/*Ejercicio 3 */
router.delete('/blogs', deleteBlogsbyId);

/*Ejercicio 4 */
//router.get('/blogs', getPublicacionComentario);

/*Ejercicio 5 */
//router.get('/blogs', getAutorPublicacion);

/*Ejercicio 6 */
//router.get('/blogs', getComentarioPublicacion)

/*Ejercicio 7 */
//router.get('/blogs', getPublicacionesNumeroComentarios);

/*Ejercicio 8 */
//router.get('/blogs',getEjercicioOcho);

/*Ejercicio 9 */
//router.get('/blogs', getEjercicioNueve);

/*Ejercicio 10 */
router.get(`/blogs`, getEjercicioDiez)



module.exports=router;