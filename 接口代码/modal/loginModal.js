/**
 * Created by Administrator on 2017/11/15.
 */
const pool = require("./sqlPool.js"); //连接池模块

// 用户登录 ..............(0:账号不存在   1:登录成功     2:密码不正确)
function userLogin(username,userpwd){
    return new Promise(function (resolve, reject) {
        let sql = "select * from user where u_name=?" ;
        pool.query(sql,[username])
            .then(function(data){
                let result;
                if(data.length>0){
                    if(data[0].u_pwd==userpwd){
                        result = 1 ; //登录成功
                    }else{
                        result = 2; //密码不正确
                    }
                }else{
                    result = 0; // 账号不存在
                }
                if(result==1){
                    resolve({code:result,data:data[0]});
                }
                else{
                    resolve({code:result});
                }
            }).catch(function(err){
            reject(err);
        });
    });
}
module.exports={
    userLogin
}