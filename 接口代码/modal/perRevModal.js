/**
 * Created by Administrator on 2017/11/16.      clz  修改
 */
const pool = require("./sqlPool.js"); //连接池模块

function getAllRev(id){
    return new Promise(function (resolve, reject) {
        let sql =`SELECT d.dictdata_name AS style ,d2.dictdata_name AS frame,d4.dictdata_name AS material,r.*,g.*
 FROM review AS r
JOIN goods AS g ON r.o_id=g.g_id
JOIN dictionary AS d ON g.g_style=d.dict_id
JOIN dictionary AS d2 ON g.g_frame=d2.dict_id
JOIN dictionary AS d4 ON g.g_material=d4.dict_id
WHERE r.u_id=? AND r.state=1;`;
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
function del(userId,revId){
    return new Promise(function (resolve, reject) {
        let sql=`UPDATE review SET state=0 WHERE u_id=? AND r_id=?`;
        pool.query(sql,[userId,revId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
module.exports={
    getAllRev,
    del
};