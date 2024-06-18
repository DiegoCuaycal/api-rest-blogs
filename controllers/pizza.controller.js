const {db} = require('../config/connection-db')

const getPizzas = async (req, res) => {
    const response =  await db.any('SELECT * FROM pizza ORDER BY piz_id desc')
    res.json(response)

}

const getPizzaById = async (req, res) => {
    const id = req.params.id
    console.log("ID:" + id);
    const response =  await db.any(`SELECT * FROM pizza 
                                    WHERE piz_id=$1::int ORDER BY piz_id desc`, [id])
    res.json(response)

}


const createPizza = async (req, res) => {
    const {piz_name, piz_description} = req.quey
    console.log("NUEVA Pizza:" + req.quey);
    const response =  await db.any(`INSERT INTO public.pizza 
        (piz_name, piz_description, ´piz_state)
        VALUES ($1, $2, true) returnig *; `, [piz_name, piz_description])

    res.json({
        message: 'Piza creada con exito',
        body : response
    })

}


module.exports = {
    getPizzas,
    getPizzaById,
    createPizza
}