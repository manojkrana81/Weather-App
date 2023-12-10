const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createPool({
    connectionLimit: 1,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
module.exports = connection;