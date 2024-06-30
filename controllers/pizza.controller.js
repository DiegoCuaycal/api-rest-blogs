const { db } = require('../config/connection-db')

const getPizzas = async (req, res) => {
    const response = await db.any('SELECT * FROM pizza ORDER BY piz_id desc')
    res.json(response)

}

const getPizzaById = async (req, res) => {
    const id = req.params.id
    console.log("ID:" + id);
    const response = await db.any(`SELECT * FROM pizza WHERE piz_id=$1::int ORDER BY piz_id desc`, [id])
    res.json(response)

}


const createPizza = async (req, res) => {
    const { piz_name, piz_description } = req.quey
    try {
        console.log("NUEVA Pizza:" + req.quey);
        const response = await db.any(`INSERT INTO public.pizza 
        (piz_name, piz_description, ´piz_state)
        VALUES ($1, $2, true) returnig *; `, [piz_name, piz_description])

        res.json({
            message: 'Piza creada con exito',
            body: response
        })
    } catch (error) {
        res.json({
            message: `Error al crear la pizza`,
            error :error
        })
    }

}

const updatePizza = async (req, res) => {
    const { piz_name, piz_description } = req.quey
    try {
        const response = await db.any(`UPDATE INTO public.pizza 
    SET piz_name=$2, piz_description=$3, ´piz_state=$4

    WHERE piz_id=$1*; `, [piz_name, piz_description])

        res.json({
            message: 'Piza creada con exito',
            body: response
        })
    } catch (error) {
        res.json({
            message: `Error al crear la pizza`,
            error :error
        })
    }

}

const deletePizza = async (req, res) => {
    const { pi_id } = req.params;
    console.log("Eliminando Pizza ID:", pi_id);

    try {
        const response = await db.result(`
            DELETE FROM public.pizza
            WHERE pi_id = $1;
        `, [pi_id]);

        if (response.rowCount > 0) {
            res.json({ message: "Pizza eliminada con éxito" });
        } else {
            res.status(404).json({ message: "Pizza no encontrada con el ID proporcionado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la pizza", error: error.message });
    }
}



module.exports = {
    getPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza

}