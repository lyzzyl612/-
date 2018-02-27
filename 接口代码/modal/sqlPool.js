const mysql = require('promise-mysql');
const pool = mysql.createPool({
    host: '172.16.10.20',
    user: 'root',
    password: 'root',
    database: 'web',
    connectionLimit: 10 //分页
});
module.exports=pool;

