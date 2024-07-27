//Package
const express = require('express')
const app = express()

//middlewears
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

//routes se las definirá posteriormente
app.use(require('../routers/index'))

//ejecucion -- app execution
app.listen(3000)
console.log('Servidor running on port: http://localhost:3000');

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});


