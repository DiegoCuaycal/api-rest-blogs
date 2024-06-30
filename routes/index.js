const {Router} = require('express')
const router = Router()
const {getPizzas, getPizzaById, createPizza, deletePizza} = require('../controllers/pizza.controller')

router.get('/pizzas', getPizzas)
router.get('/pizzas/:id', getPizzaById)
router.post('/pizzas', createPizza)
router.post('/pizzas', deletePizza)
module.exports = router