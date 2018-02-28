/**
 * Created by zy on 2017/12/5.
 */
"use strict";
const sqlPool = require("./sqlPool.js");

module.exports={
    /**
     * 1.用户图片列表
      */
    list(goodsName,brandName,sex,underline,state,pageSize,currentPage){
        let arr=[];
        pageSize= pageSize ? pageSize:sqlPool.pageSize;
        let start = (currentPage-1)*pageSize;
        pageSize = parseInt(pageSize);
        return new Promise(function(resolve,reject){
            let sql = `SELECT ui.*,u.u_name FROM USER AS u LEFT JOIN userimg AS ui ON u.u_id = ui.user_id`;
            if(goodsName){
                goodsName='%'+goodsName+'%';
                sql+=" and g.g_name like ?";
                arr.push(goodsName);
            }
            arr.push(start,pageSize);
            sql+=" order by g.g_id limit ?,? ";
            sqlPool.pool.query(sql,param).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    }

};
