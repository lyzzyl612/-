/**
 * Created by Administrator on 2017/11/16.      clz  修改
 */
const pool = require("./sqlPool.js"); //连接池模块

// 商品收藏
function getAllCool(id){
    return new Promise(function (resolve, reject) {
        let sql = `SELECT d.dictdata_name AS style ,d2.dictdata_name AS frame,d3.dictdata_name AS material,g.*,c.*
FROM goods AS g
JOIN dictionary AS d ON g.g_style=d.dict_id
JOIN dictionary AS d2 ON g.g_frame=d2.dict_id
JOIN dictionary AS d3 ON g.g_material=d3.dict_id
JOIN collection AS c ON g.g_id=c.goo_g_id
WHERE c.use_u_id=? and c.state=1`;
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
function del(useId,colId){
    return new Promise(function (resolve, reject) {
        let sql = "UPDATE collection SET state=0 WHERE use_u_id=? AND goo_g_id=?" ;
        pool.query(sql,[useId,colId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
module.exports={
    getAllCool,
    del
};
