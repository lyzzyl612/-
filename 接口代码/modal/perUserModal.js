/**
 * Created by Administrator on 2017/11/16.
 */
const pool = require("./sqlPool.js"); //连接池模块
function saveUser(sex,bir,email,qq,id){
    return new Promise(function (resolve, reject) {
        let sql = "update user set u_sex=?,u_birth=?,u_email=?,u_qq=? where u_id=?" ;
        pool.query(sql,[sex,bir,email,qq,id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//显示  clz 改
function list(userId){
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM user where u_id=?" ;
        pool.query(sql,[userId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
function region(regUname, regPwd, regPhone){
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO USER VALUES (NULL,?,?,NULL,NULL,?,NULL,NULL,NULL,NULL,NOW(),1)" ;
        pool.query(sql,[regUname, regPwd, regPhone]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}


function orderList(){
    return new Promise(function(resolve,reject){
        let sql="SELECT * FROM goods_order";
        pool.query(sql,[]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
    })
    });
}
//验证原登录密码是否正确
function validOldLpwd(oldLpwd){
    return new Promise(function(resolve,reject){
        let sql="SELECT * FROM user where u_pwd=? and u_id=1";
        pool.query(sql,[oldLpwd]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
    })
    });
}
//修改登录密码
function updateLpwd(newLpwd){
    return new Promise(function(resolve,reject){
        let sql="update user set u_pwd=? where u_id=1";
        pool.query(sql,[newLpwd]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
    })
    });
}
//验证原支付密码是否正确
function validOldPpwd(oldPpwd){
    return new Promise(function(resolve,reject){
        let sql="SELECT * FROM user where u_payPwd=? and u_id=1";
        pool.query(sql,[oldPpwd]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    });
}
//修改支付密码
function updatePpwd(newPpwd){
    return new Promise(function(resolve,reject){
        let sql="update user set u_payPwd=? where u_id=1";
        pool.query(sql,[newPpwd]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    });
}

//修改绑定邮箱
function emailChange(email){
    return new Promise(function(resolve,reject){
        let sql="update user set u_email=? where u_id=1";
        pool.query(sql,[email]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    });
}
function updatePhone(txtPhone,userId){
    return new Promise(function(resolve,reject){
        let sql="update user set u_phone=? where u_id=?";
        pool.query(sql,[txtPhone,userId]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    });
}

module.exports={
    saveUser,
    list,
    orderList,
    validOldLpwd,
    updateLpwd,
    validOldPpwd,
    updatePpwd,
    emailChange,
    region,
    updatePhone
};