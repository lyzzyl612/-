/**
 * Created by caiyi on 2017/11/15.
 */

"use strict";
const myexpress=require("express");
const uRoute=myexpress.Router();
const uController=require("../controller/userControl.js");//用户
const uiController=require("../controller/uiControl.js");//用户图片
const goodsControl = require("../controller/goodsControl.js");//商品
const orderControl = require("../controller/orderController.js");//订单
const brandControll=require("../controller/brandController.js");//品牌-HPP
const companyControll=require("../controller/companyController.js");//公司-HPP
const fashionControll=require("../controller/fashionController.js");//公司-HPP



//uRoute.route("/user/login.do").get(uController.userLogin);
uRoute.route("/user/login.do").get(function(req,res,next){
    uController.userLogin(req,res,next);
});
//uRoute.route("/*").all(function(req,res,next){
//    console.log("111111111111111111111111111111");
//    uController.isLogin(req,res,next)
//});


//--------------------------------获取用户名-cy------------------------------//
uRoute.route("/user/frameLogin.do").post(function(req,res,next){
    let name=req.session.username;
    res.send(name);
    //console.log(name)
});
//--------------------------------用户-cy------------------------------//
uRoute.route("/userList.html").get(function(req,res,next){
    uController.listEjs(req,res,next);
});
//--------------------------------用户图片-zy------------------------------//
uRoute.route("/userImg.html").get(function(req,res){
    uiController.listEjs(req,res)
});
//--------------------------------商品-zy------------------------------//
uRoute.route("/goodsList.html").get(function(req,res){
        goodsControl.listEjs(req,res);
        //res.render("goodsList");
    }
);
//--------------------------------订单-lyz------------------------------//
uRoute.get("/orderList.html",orderControl.list);
//--------------------------------品牌-HPP------------------------------//
uRoute.get("/brand.html",(req,resp)=>{
    resp.redirect("/brand.html/1");
});
//动态路由
uRoute.route("/brand.html/:br").get(brandControll.getALL);
//--------------------------------品牌-HPP------------------------------//
//--------------------------------公司-HPP------------------------------//
uRoute.get("/companyList.html",(req,resp)=>{
    resp.redirect("/companyList.html/1");
});
//动态路由
uRoute.route("/companyList.html/:br").get(companyControll.getALL);
//--------------------------------公司-HPP------------------------------//

//--------------------------------文章-HPP------------------------------//
uRoute.get("/fashionList.html",(req,resp)=>{
    resp.redirect("/fashionList.html/1");
});
//动态路由
uRoute.route("/fashionList.html/:br").get(fashionControll.getALL);
//--------------------------------文章-HPP------------------------------//

module.exports=uRoute;
