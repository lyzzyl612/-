/**
 * Created by Administrator on 2017/11/20.
 */
const pool = require("./sqlPool.js"); //连接池模块
// function saveAdd(id,name,phone,uphone,code,province,city,region,details){
//     return new Promise(function (resolve, reject) {
//         let sql = "insert into address (a_u_id,a_receiver,a_phone,a_urphone,a_code,a_province,a_city,a_region,a_details,create_time) values(?,?,?,?,?,?,?,?,?,now());" ;
//         pool.query(sql,[id,name,phone,uphone,code,province,city,region,details]).then(function(data){
//             resolve(data);
//         }).catch(function(err){
//             reject(err);
//         });
//     });
// }
//显示
function list(id){
    return new Promise(function (resolve, reject) {
        let sql = "  SELECT * FROM customer JOIN goods_order ON customer.o_num=goods_order.o_num WHERE customer.c_u_id=?";
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
            console.log(err);
        });
    });
}
//删除
function del(id){
    return new Promise(function (resolve, reject) {
        let sql = "DELETE FROM customer WHERE c_id=?" ;
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//取消退款
function can(id){
    return new Promise(function (resolve, reject) {
        let sql = " UPDATE customer SET state=3 WHERE c_id=?" ;
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}

module.exports={
    list,
    del,
    can
}