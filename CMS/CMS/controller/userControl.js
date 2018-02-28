/**
 * Created by caiyi on 2017/11/15.
 */
"use strict";
const mysql = require("mysql");
const uModal = require("../modal/userModal.js");


module.exports = {
    userLogin(req, res, next){
        //console.log("userControl");
        let name=req.query.name;
        let pwd=req.query.pwd;
        //console.log(name);
        //console.log(pwd);
        uModal.userLogin(name,pwd).then(function(data){
            if (data.length > 0) {
                req.session.username = name;

                req.session.userpwd = pwd;
                console.log("login",req.session.username);
                //console.log(name);

                res.send("登录成功")
            } else {
                res.send("用户名或密码错误");
            }
        }).catch(function(err){
            console.log(err)
        })
    },
    listEjs(req, res, next){
        let list;
        uModal.search(null, null, null, null, 1).then(function (data) {
            //res.render("userList", {"data": data});
            list = data;
        }).then(function () {
            uModal.searchPage(null, null, null).then((data)=> {
                var pagenum = data;
                var name=req.session.username;
                console.log(name);
                let obj={"list": list, "pagenum": pagenum,"name":name};
                //console.log(obj);
                res.render("userList",obj)
            })
        }).catch(function (err) {
                console.log(err)
            })
    },
    listAjax(req, res, next){
        let name = req.body.name;
        let state = req.body.state;
        let sex = req.body.sex;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        let list;
        uModal.search(name, state, sex, pageSize, currentPage).then(function (data) {
            //res.send(data);
           list=data
        }).then(function(){
            uModal.searchPage(null, null, null).then((data)=>{
                var pagenum = data;
                var name=req.session.username;
                console.log(name);
                console.log(pagenum);
                res.send({"list": list, "pagenum": pagenum})
            })
        })
            .catch(function (err) {
            console.log(err)
        })
    },
    update(req, res, next){
        let name = req.body.name;
        let sex = req.body.sex;
        let birth = req.body.birth;
        let phone = req.body.phone;
        let email = req.body.email;
        let QQ = req.body.QQ;
        let state = req.body.state;
        let id = req.body.id;
        //console.log(id);
        uModal.update(name, sex, birth, phone, email, QQ, state, id).then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    },
    changeState(req, res, next){
        let id = req.body.id;
        let state = req.body.state;
        uModal.changeState(state, id).then(function (data) {
            res.send(data);
            console.log(data)
        }).catch(function (err) {
            console.log(err)
        })
    },
    search(req, res, next){
        let name = req.body.name;
        let state = req.body.state;
        let sex = req.body.sex;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        let list;
        uModal.search(name, state, sex, pageSize, currentPage).then(function (data) {
            list = data;
        }).then(function () {
            uModal.searchPage(name, state, sex).then((data)=> {
                var pagenum = data;
                //console.log("dafsaf");
                //console.log(pagenum);
                res.send({"list": list, "pagenum": pagenum})
            })
        }).catch(function (err) {
            console.log(err)
        })
    },
    getDate(req, res, next){
        let id = req.body.id;
        let name=req.session.username;
        let pwd=req.session.userpwd;
        //console.log(id);
        uModal.getDate(id).then(function (data) {
            //let obj={"data":data,"name":name};
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    },
    listPage(req, res, next){
        uModal.listPage().then(function (data) {
            res.send(data)
        }).catch(function (err) {
            console.log(err)
        })
    }
//    isLogin(req,res,next){
//        console.log("isisisis",req.session.username);
//    if(!req.session.username){
//        console.log(333);
//        res.send("<script>top.window.location.href = '/login.html';</script>");
//    }else{
//        next();
//    }
//}

};


