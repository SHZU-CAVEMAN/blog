const mysql = require("mysql");
// const Mysql = new mysql();
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'blogdb'
})
module.exports = db;