const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "king6123",
    host: "localhost",
    port: "5432",
    database: "jwtapp"
});
console.log("connected to db!");

module.exports = pool;