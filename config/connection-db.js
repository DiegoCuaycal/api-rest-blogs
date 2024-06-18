const pgPromise = require('pg-promise');
const config = {
    host: 'localhost',
    port: '5432',
    database: 'BlogSystem',
    user: 'postgres',
    password: 'Diego20'
}

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db