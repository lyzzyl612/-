/**
 * Created by Administrator on 2017/11/15.
 */
const loginModal = require("../modal/loginModal.js");
//登录
function userLogin(req,res){
    let username = req.body.username;
    let userpwd = req.body.userpwd;
    loginModal.userLogin(username,userpwd).then(function(data){
        if(data.code==1){
            req.session.userInfo = data.data;
            res.send({code:1,data:data.data});
        }
        if(data.code==2){
            res.send({code:2});
        }
        if(data.code==0){
            res.send({code:0});
        }
        console.log(data.code)
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}

//退出
function userLogout(req,res){
    if(!req.session.userInfo){
        req.session.userInfo="";
        res.send("退出成功!");
    }else{
        res.send("程序出错!");
    }
}
//判断是否登录
function isLogin(req,res,next){
    if(!req.session.userInfo){
        res.redirect('/index.html');
    }else{
        next();
    }
}
module.exports={
    userLogin,
    isLogin,
    userLogout
}