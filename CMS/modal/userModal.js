/**
 * Created by caiyi on 2017/11/15.
 */
"use strict";
const mysql=require("mysql");
const pool=require("./sqlPool.js");
module.exports={
    userLogin(name,pwd){
        return new Promise(function(resolve,reject){
            "use strict";
            let sql="select * from  user where u_name=? and u_pwd=?";
            pool.pool.query(sql,[name,pwd]).then(function(data){
                resolve(data);
                //console.log(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    update(name,sex,birth,phone,email,QQ,state,id){
        return new Promise(function(resolve,reject){
            let sql="update user set u_name=?,u_sex=?,u_birth=?,u_phone=?,u_email=?,u_QQ=?,state=? where u_id=?";
            pool.pool.query(sql,[name,sex,birth,phone,email,QQ,state,id]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    changeState(state,id){
        return new Promise(function(resolve,reject){
            if(state==1){
                state=0
            }else{
                state=1
            }
            let sql="update user set state=? where u_id=?";
            pool.pool.query(sql,[state,id]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    search(name,state,sex,pageSize,currentPage){
        pageSize = (pageSize == null) ? pool.pageSize : pageSize;
        return new Promise(function(resolve,reject){
            //let start = (currentPage - 1) * pageSize;
            //let end=parseInt(pageSize);
            let sql="select * from user where 1=1 ";
            var arr=[];
            if(name){
                name="%"+name+"%";
                sql+="and u_name like ? ";
                arr.push(name)
            }
            if(state){
                sql+="and state=?";
                arr.push(state)
            }
            if(sex){
                sql+="and u_sex=?";
                arr.push(sex)
            }
            let start = (currentPage - 1) * pageSize;
            let end=parseInt(pageSize);
            arr.push(start);
            arr.push(end);
           sql+="limit ?,?";
            pool.pool.query(sql,arr).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    searchPage(name,state,sex){
        return new Promise(function(resolve,reject){
            let sql="select count(1) as number from user where 1=1 ";
            var arr=[];
            if(name){
                name="%"+name+"%";
                sql+="and u_name like ? ";
                arr.push(name)
            }
            if(state){
                sql+="and state=?";
                arr.push(state)
            }
            if(sex){
                sql+="and u_sex=?";
                arr.push(sex)
            }
            //let start = (currentPage - 1) * pageSize;
            //let end=parseInt(pageSize);
            //arr.push(start);
            //arr.push(end);
            //sql+=" limit ?,?";
            console.log(arr);
            pool.pool.query(sql,arr).then(function(data){
                //console.log(data);
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    getDate(id){
        return new Promise(function(resolve,reject){
            let sql="select * from user where u_id=?";
            pool.pool.query(sql,[id]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    listPage(){
        return new Promise(function(resolve,reject){
            let sql="select count(1) as num from user";
            pool.pool.query(sql,[]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    }

};


