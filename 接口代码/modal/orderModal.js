/**
 * Created by Administrator on 2017/11/16.
 */
const pool = require("./sqlPool.js"); //连接池模块

function getAllorder(){
    return new Promise(function (resolve, reject) {
        let sql = "SELECT *,(SELECT GROUP_CONCAT(d.dictdata_name) FROM dictionary AS d WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color FROM order1 AS o LEFT JOIN goods_order AS go ON o.o_id=go.ord_o_id LEFT JOIN goods AS g ON go.goo_g_id=g.g_id LEFT JOIN address AS a ON o.o_a_id=a.a_id WHERE o.o_id=1";
        pool.query(sql,[]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
module.exports={
    getAllorder
}