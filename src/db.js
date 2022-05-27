//const { Client } = require("pg");

const {Pool, Client} = require("pg");

const db = new Pool({
    user: "fani",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "tasksdb"
});

module.exports = db;