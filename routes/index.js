const {Router}=require('express')
const router = Router()
const {getPizzas,getPizzasById,createPizza,updatePizza,deletePizza,
        createPizza_Ingredient,updatePizza_Ingredient,deletePizza_Ingredient

} = require('../controllers/pizza.controller')

router.get('/pizzas',getPizzas)
router.get('/pizzas/:id',getPizzasById)
router.post('/pizzas',createPizza)
router.put('/pizzas',updatePizza)
router.delete('/pizzas',deletePizza)
//Ingredientes Pizza
router.post('/pizzas/cre_piz_ing',createPizza_Ingredient)
router.put('/pizzas/upd_piz_ing',updatePizza_Ingredient)
router.delete('/pizzas/del_piz_ing',deletePizza_Ingredient)


module.exports = router