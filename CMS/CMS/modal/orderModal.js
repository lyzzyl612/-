/**
 * Created by xyy on 2017/10/31.
 */
"use strict";
const sqlPool = require("./sqlPool.js");

module.exports = {

    update(para,fun){

        return new Promise((resolve,reject) =>{
            let sql = "UPDATE order1 AS o ,address AS a SET o.o_amount=?,o.o_underline=?,o.o_deposit=?,o.o_state=?,a.a_province=?,a.a_city=?,a.a_region=?,a.a_details=? WHERE o.o_a_id=a.a_u_id AND o_u_id =?";

            sqlPool.pool.query(sql,para).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })

    },
    person(staffName){
        //let sql = "select staffId from staff where staffuser=?";

        //sqlPool.dbOpertion(sql,staffName,fun);
        return new Promise((resolve,reject) =>{
            let sql = "select staffId from staff where staffuser=?";

            sqlPool.pool.query(sql,staffName).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    select(id,fun){

        return new Promise((resolve,reject) =>{
            let sql = `SELECT o.o_state,a.a_receiver,a.a_phone,a.a_province,a.a_city,a.a_region,a.a_details,o.o_u_id,o.o_deposit,o.o_underline,o.o_logistNum,o.booking_day,o.booking_time,o.booking_remark,o.o_amount,g.g_saleprice,g.g_src,go.go_img,go.go_count,go.go_return,go.go_problem,go.create_time,g.g_sex,g.g_type,g.g_name  FROM address AS a,order1 AS o,goods_order AS go,goods AS g WHERE a.a_u_id= o.o_u_id AND a.a_id= o.o_a_id AND go.ord_o_id=o.o_id AND go.goo_g_id=g.g_id and  o_u_id=?`;
            console.log("select11111111111111111");
            console.log(sql);
            console.log(id);
            sqlPool.pool.query(sql,id).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    list(o_state,o_under,o_dep,selName,selLog,currentPage,pageSize){
        return new Promise((resolve,reject) =>{
            let arr=[];

            pageSize= pageSize ? pageSize:sqlPool.pageSize;
            let start = (currentPage-1)*pageSize;


            pageSize = parseInt(pageSize);
            console.log("1111111111111111111111111")
            console.log(currentPage);
            console.log(start);
            console.log(pageSize);
            let sql = `SELECT a.a_receiver,a.a_phone,a.a_province,a.a_city,a.a_region,a.a_details,o.o_u_id,o.o_deposit,o.o_state,o.o_underline,o.o_logistNum,o.booking_day,o.booking_time,o.booking_remark,o.o_amount,go.go_img,go.go_count,go.go_return,go.go_problem,DATE_FORMAT(go.create_time,'%Y-%m-%d') AS go_create_time,g.g_name
            FROM address AS a RIGHT JOIN order1 AS o ON a.a_u_id= o.o_u_id AND a.a_id= o.o_a_id LEFT JOIN goods_order AS go ON go.ord_o_id=o.o_id LEFT JOIN goods AS g ON go.goo_g_id=g.g_id WHERE 1=1 `;
            if(o_state){
                sql+=" and o.o_id = ?";
                arr.push(o_state);
            }
            if(o_under){
                sql+=" and o.o_underline = ?";

                arr.push(o_under);
            }
            if(o_dep){
                sql+=" and o.o_deposit = ?";

                arr.push(o_dep);
            }
            if(selName){
                selName='%'+selName+'%';
                sql+=" and a.a_receiver like ?";

                arr.push(selName);
            }
            if(selLog){
                selLog='%'+selLog+'%';
                sql+=" and o.o_logistNum like ?";

                arr.push(selLog);
            }
            arr.push(start,pageSize);
            sql+=" order by o.o_id  limit ?,? ";


            console.log(sql);
            sqlPool.pool.query(sql,arr).then(function(data){
                let param={
                    "data":data,
                    "pageSize":pageSize
                }


                resolve(param)


            }).catch(function(err){
                reject(err);
                console.log(err)
            });
        })
    },
    totalRow(){
        return new Promise((resolve,reject) =>{
            let sql = "select count(1) as num from order1";
            //sqlPool.dbOpertion(sql,[],fun);
            sqlPool.pool.query(sql,[]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err);
            });
        })
    },
    listJob(){
        return new Promise((resolve,reject) =>{
            let sql = "select * from order1";

            //sqlPool.dbOpertion(sql,[],fun);
            sqlPool.pool.query(sql,[]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err);
            });
        });
    }
};
