//Packages
const express = require('express');
const app = express()
const { db } = require('../config/connection-db');
//middlewears 
app.use(express.json())
app.use(express.urlencoded(({ extended: true })))
//Routes
app.use(require('../routes/index'))
//Executions
app.use('/',(req,res)=>{res.send('Bienvenido a mi api pizzeria')})

app.listen(3000)
console.log('Server running in: http://localhost:3000');


