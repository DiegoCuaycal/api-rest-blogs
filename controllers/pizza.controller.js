const { db } = require('../config/connection-db')
const getPizzas = async (req, res) => {
    const response = await db.any(`SELECT * FROM pizza ORDER BY piz_id desc`)
    res.json(response)
}

const getPizzasById = async (req, res) => {
    const id = req.params.id
    console.log("ID: " + id)
    const response = await db.any(`SELECT * FROM pizza WHERE piz_id = $1 ::int ORDER BY piz_id desc`, [id])
    res.json(response)
}

const createPizza = async (req, res) => {
    const { piz_name, piz_description } = req.query
    try {
        //me regresa db.any varios datos, para insertar no retorna nada de datos, no el mensaje
        const response = await db.one(`INSERT INTO public.pizza(
        piz_name, piz_description,piz_state)
        VALUES ($1, $2, true) returning *;`, [piz_name, piz_description])
        res.json({
            message: 'Pizza creada con exito',
            body: response
        })
    } catch (error) {
        res.json({
            message: "Error al crear pizza",
            error: error
        })
    }
}

const updatePizza = async (req, res) => {
    const { piz_id, piz_name, piz_description, piz_state } = req.query
    console.log("Nuevos datos: " + req.query)
    try {
        const response = await db.one(`UPDATE public.pizza
            SET piz_name=$2, piz_description=$3, piz_state=$4
            WHERE piz_id=$1 returning *;`, [piz_id, piz_name, piz_description, piz_state])
        res.json({
            message: 'Pizza actualizada con exito',
            body: response
        })
    } catch (error) {
        console.error(error)
        message: "No se pudo actualizar el registro"
    }
}

const deletePizza = async (req, res) => {
    const { piz_id } = req.query
    console.log("Id de la Pizza a Eliminar: " + req.query)
    try {
        const response = await db.one(`DELETE FROM public.pizza
	WHERE piz_id=$1 returning *;`, [piz_id])
        res.json({
            message: 'Pizza eliminada',
            body: response
        })
    } catch (error) {
        console.error(error)
        message: "No se pudo eliminar el registro"
    }
}

/* Agregar ingredientes a una pizza*/
const createPizza_Ingredient = async (req, res) => {
    const { piz_id, ing_id, pi_portion } = req.query
    try {
        //me regresa db.any varios datos, para insertar no retorna nada de datos, no el mensaje
        const response = await db.one(`INSERT INTO public.pizza_ingredient(
	piz_id, ing_id, pi_portion)
	VALUES ($1, $2, $3) returning *;`, [piz_id, ing_id, pi_portion])
        res.json({
            message: 'Ingrediente Agregado con exito',
            body: response
        })
    } catch (error) {
        res.json({
            message: "Error al agregar ingrediente pizza",
            error: error
        })
    }
}

const updatePizza_Ingredient = async (req, res) => {
    const { piz_id, ing_id, pi_portion } = req.query
    try {
        //me regresa db.any varios datos, para insertar no retorna nada de datos, no el mensaje
        const response = await db.one(`UPDATE public.pizza_ingredient
	SET piz_id=$1, ing_id=$2, pi_portion=$3
	WHERE piz_id=$1 AND ing_id=$2 returning *;`, [piz_id, ing_id, pi_portion])
        res.json({
            message: 'Ingrediente Actualizado con exito',
            body: response
        })
    } catch (error) {
        res.json({
            message: "Error al actualizar ingrediente pizza",
            error: error
        })
    }
}


const deletePizza_Ingredient = async (req, res) => {
    const { piz_id, ing_id } = req.query
    console.log("Id de la Pizza a Eliminar: " + req.query)
    try {
        const response = await db.one(`DELETE FROM public.pizza_ingredient
	WHERE piz_id=$1 and ing_id=$2 returning *;`, [piz_id, ing_id])
        res.json({
            message: 'Pizza Ingrediente eliminada',
            body: response
        })
    } catch (error) {
        console.error(error)
        message: "No se pudo eliminar el Ingrediente de la Pizza"
    }
}



module.exports = {
    getPizzas,
    getPizzasById,
    createPizza,
    updatePizza,
    deletePizza,
    createPizza_Ingredient,
    updatePizza_Ingredient,
    deletePizza_Ingredient
}