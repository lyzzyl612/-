/**
 * Created by zy on 2017/11/15.
 *
 */
"use strict";

const mysql = require("promise-mysql");

var pool = mysql.createPool({
    host:"172.16.10.20",
    user:"root",
    password:"root",
    port:3306,
    database:"web",
    connectionLimit:10
});
module.exports = {
    pool,
    pageSize:5
};












//"use strict";
//const mysql=require("mysql");
//module.exports={
//    pageSize:2,
//    config:{
//        host: "localhost",
//        user: "root",
//        password: "root",
//        port: "3306",
//        database: "web"
//    },
//    dbOpertion:function(sql,arr,fn){
//        let pool=mysql.createPool(this.config);
//        pool.getConnection(function(err,connection){
//        if(err){
//            console.log(err)
//        }
//            connection.query(sql,arr,fn); //ִ��query
//            connection.release(); //���ӽ����ͷ�
//
//        })
//    }
//};>>>>>>> .r20
