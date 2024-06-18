const {Router} = require('express')
const router = Router()
const {getPizzas, getPizzaById, createPizza} = require('../controllers/pizza.controller')

router.get('/pizzas', getPizzas)
router.get('/pizzas/:id', getPizzaById)
router.post('/pizzas', createPizza)
module.exports = router