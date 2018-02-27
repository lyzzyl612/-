/**
 * Created by Administrator on 2017/10/23.
 */
const mysql = require('promise-mysql');
const pool = mysql.createPool({
    host: '172.16.10.20',
    user: 'root',
    password: 'root',
    database: 'web',
    connectionLimit: 10
});
module.exports=pool;
