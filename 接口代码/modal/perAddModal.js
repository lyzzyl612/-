/**
 * Created by Administrator on 2017/11/17.     clz  修改
 */
const pool = require("./sqlPool.js"); //连接池模块
function Add(userId,name,phone,province,city,region,receiver){
    console.log(userId,name,phone,province,city,region,receiver)
    return new Promise(function (resolve, reject) {
        let sql =`INSERT INTO address VALUES (NULL,?,?,?,?,?,?,?,NOW(),0)`;
        pool.query(sql,[userId,name,phone,province,city,region,receiver]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//显示
function list(userId){
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM address where a_u_id=?";
        pool.query(sql,[userId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//删除
function del(userId,addressId){
    return new Promise(function (resolve, reject) {
        let sql = `DELETE FROM address WHERE a_u_id=? AND a_id=? ` ;
        pool.query(sql,[userId,addressId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}

////获取修改框中的内容
//function get(id){
//    return new Promise(function (resolve, reject) {
//        let sql = "SELECT * FROM address where a_id=?" ;
//        pool.query(sql,[id]).then(function(data){
//            resolve(data);
//        }).catch(function(err){
//            reject(err);
//        });
//    });
//}
// 修改
function saveAdd(name,phone,province,city,region,receiver,userId,addressId){
    return new Promise(function (resolve, reject) {
        let sql = `UPDATE address SET a_receiver=?,a_phone=?,a_province=?,a_city=?,a_region=?,a_details=? WHERE a_u_id=? AND a_id=?`;
        pool.query(sql,[name,phone,province,city,region,receiver,userId,addressId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
module.exports={
    Add,
    list,
    del,
    saveAdd
}