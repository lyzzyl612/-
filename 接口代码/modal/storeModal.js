/**
 * Created by zy on 2017/12/18.
 */
"use strict";
const pool = require("./dbHelp.js");

module.exports={
    //支付页面获取地址表数据
    address:function(userid) {
        return new Promise(function (resolve, reject) {
            let sql = "SELECT * FROM address where a_u_id=?";
            pool.query(sql,[userid])
                .then(function (data) {
                    resolve(data)
                }).catch(function (err) {
                    reject(err)
                })
        })
    },
    //支付页面获取商品购物车数据
    goodsOrder:function(u_id) {
        return new Promise(function (resolve, reject) {
            let sql = `SELECT *,
(SELECT GROUP_CONCAT(d.dictdata_name)
                                FROM dictionary AS d
                                WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color
 FROM shopping_cart AS s LEFT JOIN goods AS g ON s.g_id = g.g_id where s.u_id=?`;
            pool.query(sql,[u_id])
                .then(function (data) {
                    resolve(data)
                }).catch(function (err) {
                    reject(err)
                })
        })
    },
    //支付页面获取商品购物车数据
    orderSave:function([o_u_id,o_a_id,o_num,o_amount,
        o_state,o_logistNum,o_underline,o_deposit,
        booking_day,booking_time,booking_remark]) {
        return new Promise(function (resolve, reject) {
            if(booking_day){
                booking_day=booking_day
            }else{
                booking_day=''
            }
            if(booking_time){
                booking_time=booking_time
            }else{
                booking_time=''
            }
            if(booking_remark){
                booking_remark=booking_remark
            }else{
                booking_remark=''
            }
            let sql = `INSERT INTO order1 VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,NOW(),DEFAULT)`;
            pool.query(sql,[o_u_id,o_a_id,o_num,o_amount,
                o_state,o_logistNum,o_underline,o_deposit,
                booking_day,booking_time,booking_remark])
                .then(function (data) {
                    resolve(data)
                }).catch(function (err) {
                    reject(err)
                })
        })
    }
}

