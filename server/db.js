const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "Dohdela380!!",
    host: "localhost",
    port: 5432,
    database: "kyckstart"
})

module.exports = pool