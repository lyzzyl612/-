/**
 * Created by zy on 2017/11/15.
 * dao:数据层
 * 商品表，相关的操作
 */
"use strict";

const sqlPool = require("./sqlPool.js");

module.exports = {
    add(param){
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO goods VALUES
(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),DEFAULT)`;
            //console.log("add sql"+sql);
            //console.log("add param",param);
            sqlPool.pool.query(sql,param).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    del(state,id){
        return new Promise((resolve,reject) =>{
            let sql = "UPDATE goods SET state=? WHERE g_id=?";
            sqlPool.pool.query(sql,[state,id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })

    },
    update(para,fun){
        return new Promise((resolve,reject) =>{
            let sql = `UPDATE goods SET g_src=?,g_name=?,b_id=?,g_bid=?,g_saleprice=?,g_promotion=?,g_weight=?,g_outerWidth=?,
            g_width=?,g_length=?,g_innerWidth=?,g_height=?,g_underline=?,g_sex=?,g_stock=?,
            g_style=?,g_material=?,g_frame=?,g_color=? WHERE g_id =?`;
            sqlPool.pool.query(sql,para).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    person(staffName){
        //let sql = "select staffId from staff where staffuser=?";
        //console.log(sql);
        //sqlPool.dbOpertion(sql,staffName,fun);
        return new Promise((resolve,reject) =>{
            let sql = "select staffId from staff where staffuser=?";
            //console.log(sql)
            //console.log(staffName)
            sqlPool.pool.query(sql,staffName).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    /**
     * select,修改页面的数据获取
     */
    select(id,fun){
        return new Promise((resolve,reject) =>{
            let sql = `SELECT *,(SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_style) AS 'style',
                            (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_material) AS 'material',
                            (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_frame) AS 'frame',
                            (SELECT GROUP_CONCAT(d.dictdata_name) FROM dictionary AS d
                                WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color
                    FROM brand AS b RIGHT JOIN goods AS g ON b.b_id=g.b_id
                    WHERE g.g_id=?`;
            sqlPool.pool.query(sql,id).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    /**
     * list,商品信息的列表
     */
    list(goodsName,brandName,sex,underline,state,pageSize,currentPage){
        return new Promise((resolve,reject) =>{
            let arr=[];
            pageSize= pageSize ? pageSize:sqlPool.pageSize;
            let start = (currentPage-1)*pageSize;
            pageSize = parseInt(pageSize);
            let sql = `SELECT *,(SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_style) AS 'style',
            (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_material) AS 'material',
            (SELECT d.dictdata_name FROM dictionary AS d WHERE d.dict_id=g.g_frame) AS 'frame',
            (SELECT GROUP_CONCAT(d.dictdata_name)
                                FROM dictionary AS d
                                WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS color
                     FROM brand AS b RIGHT JOIN goods AS g ON b.b_id=g.b_id WHERE 1=1`;
            if(goodsName){
                goodsName='%'+goodsName+'%';
                sql+=" and g.g_name like ?";
                arr.push(goodsName);
            }
            if(brandName){
                sql+=" and b.b_id = ?";
                arr.push(brandName);
            }
            if(sex){
                sql+=" and g.g_sex = ?";
                arr.push(sex);
            }
            if(underline){
                sql+=" and g.g_underline = ?";
                arr.push(underline);
            }
            if(state){
                sql+=" and g.state = ?";
                arr.push(state);
            }
            arr.push(start,pageSize);
            sql+=" order by g.g_id limit ?,? ";
            /*console.log("details");
            console.log(sql);
            console.log(arr);*/
            sqlPool.pool.query(sql,arr).then(function(data){
                let param={
                    "data":data,
                    "pageSize":pageSize
                }
                resolve(param);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    totalRow(goodsName,brandName,sex,underline,state){
        return new Promise((resolve,reject) =>{
            //查询分页
            let arr=[];
            let sql = "select count(1) as num from goods where 1=1";
            if(goodsName){
                goodsName='%'+goodsName+'%';
                sql+=" and g_name like ?";
                arr.push(goodsName);
            }
            if(brandName){
                sql+=" and b_id = ?";
                arr.push(brandName);
            }
            if(sex){
                sql+=" and g_sex = ?";
                arr.push(sex);
            }
            if(underline){
                sql+=" and g_underline = ?";
                arr.push(underline);
            }
            if(state){
                sql+=" and state = ?";
                arr.push(state);

            }

            sqlPool.pool.query(sql,arr).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err);
            });
        })
    },
    listBrand(){
        return new Promise((resolve,reject) =>{
            let sql = `SELECT * FROM brand`;
            sqlPool.pool.query(sql).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err);
            });
        });
    },
    //字典表里的风格、材质、框型、颜色
    dictionary(dictvalue){
        //console.log("style"+dictvalue);
        return new Promise((resolve,reject) =>{
            let sql = `SELECT * FROM dictionary AS d WHERE d.dict_value=?`;
            sqlPool.pool.query(sql,[dictvalue]).then(function(data){
                resolve(data)
            }).catch(function(err){
                console.log(err)
                reject(err);
            });
        });
    },
    addDict(value,name){

        return new Promise((resolve,reject)=>{
            let sql = `insert into dictionary values(null,?,?,null,now(),default)`;
            sqlPool.pool.query(sql,[value,name]).then(function(data){
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
};
