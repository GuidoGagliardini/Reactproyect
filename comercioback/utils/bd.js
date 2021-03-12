const knex = require ('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password:'',
        database: process.env.DB_NAME
    },
    debug: true,
    pool: {min: 2, max: 8}
})
module.exports = knex;