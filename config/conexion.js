const pgPromise = require('pg-promise');
const config = {
    host: 'localhost',
    port: '5432',
    database: 'Pizza', // cambios de la base
    user: 'postgres',
    password: 'Diego20'
}

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db