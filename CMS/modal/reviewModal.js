/**
 * Created by HT on 2017/11/15 0015.
 * 评论modal（模型）层
 */
"use strict";

//引入连接池
const sqlPool = require("./sqlPool.js");

module.exports = {
    // 启用评论
    startUsing(rId){
        return new Promise(function (resolve,reject) {
            let sql = "update review set state = 1 where r_id = ?";
            sqlPool.pool.query(sql,[rId])
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })
        })

    },
    // 禁用评论
    disable(rId){
        return new Promise(function (resolve, reject) {
            let sql = "update review set state = 0 where r_id = ?";
            sqlPool.pool.query(sql, [rId])
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })
        })

    },
    // 删除评论
    delete(rId){
        return new Promise(function (resolve, reject) {
            let sql = "delete from review where r_id = ?";
            sqlPool.pool.query(sql, [rId])
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })
        })
    },
    //获取总数据条数
    reqTotalItem(){
        return new Promise(function (resolve, reject) {
            let sql = "select count(1) AS totalItem from review";
            sqlPool.pool.query(sql, [])
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })
        })
    },
//请求当前页的数据
    list(nowPage,perPageItem){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM review AS r JOIN USER AS u ON r.u_id=u.u_id limit ?,?";
            let startItem = (nowPage - 1) * perPageItem;
            sqlPool.pool.query(sql, [startItem, parseInt(perPageItem)])
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })

        })
    },
    //根据查询条件查询相应数据
    searchPagination(rId,uId,oId,rState){
        return new Promise(function (resolve, reject) {

            let arr = [];
            let sql = "select count(*) AS totalItem from review where 1=1";

            if(rId.length>0){
                sql += " and r_id = ?";
                let num_rId = parseInt(rId);
                arr.push(num_rId);
            }
            if(uId.length>0){
                sql += " and u_id = ?";
                let num_uId = parseInt(uId);
                arr.push(num_uId);
            }
            if(oId.length>0){
                sql += " and o_id = ?";
                let num_oId = parseInt(oId);
                arr.push(num_oId);
            }
            if(rState.length>0){
                sql += " and state = ?";
                let num_rState = parseInt(rState);
                arr.push(num_rState);
            }
            sqlPool.pool.query(sql, arr)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })

        })
    },
    search(rId,uId,oId,rState,nowPage,perPageItem){
        return new Promise(function (resolve, reject) {

            let arr = [];
            let sql = "SELECT * FROM review AS r JOIN USER AS u ON r.u_id=u.u_id where 1=1";

            if(rId.length>0){
                sql += " and r_id = ?";
                let num_rId = parseInt(rId);
                arr.push(num_rId);
            }
            if(uId.length>0){
                sql += " and u_id = ?";
                let num_uId = parseInt(uId);
                arr.push(num_uId);
            }
            if(oId.length>0){
                sql += " and o_id = ?";
                let num_oId = parseInt(oId);
                arr.push(num_oId);
            }
            if(rState.length>0){
                sql += " and state = ?";
                let num_rState = parseInt(rState);
                arr.push(num_rState);
            }
            if(1===1){
                sql += " limit ?,?";
                let num_nowPage = parseInt(nowPage);
                let num_perPageItem = parseInt(perPageItem);

                let startItem = (num_nowPage - 1) * num_perPageItem;

                arr.push(startItem);
                arr.push(num_perPageItem);
            }
            sqlPool.pool.query(sql, arr)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                })

        })
    }


};