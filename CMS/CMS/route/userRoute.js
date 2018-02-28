/**
 * Created by caiyi on 2017/11/16.
 */
"use strict";
const myexpress=require("express");
const uRoute=myexpress.Router();
const uController=require("../controller/userControl.js");

//ajax方法载入数据
uRoute.route("/listAjax.do").post(function(req,res,next){
    console.log("进入userRoute里面的listAjax.do");
    uController.listAjax(req,res,next)
});

//修改数据
uRoute.route("/update.do").post(function(req,res,next){
    console.log("进入userRoute里面的update.do");
    uController.update(req,res,next)
});
//修改启用禁用状态
uRoute.route("/changeState.do").post(function(req,res,next){
    console.log("进入userRoute里面的changeState.do");
    uController.changeState(req,res,next)
});

//多条件查询
uRoute.route("/search.do").post(function(req,res,next){
    console.log("进入userRoute里面的search.do");
    uController.search(req,res,next)
});
//页面载入时，找到state的值
uRoute.route("/getStateValue.do").post(function(req,res,next){
    console.log("进入userRoute里面的getStateValue.do");
    uController.getStateValue(req,res,next)
});
//点击修改按钮，获取该列数据的值
uRoute.route("/getDate.do").post(function(req,res,next){
    console.log("进入userRoute里面的getDate.do");
    uController.getDate(req,res,next)
});
uRoute.route("/listPage.do").post(function(req,res,next){
    console.log("进入userRoute里面的listPage.do");
    uController.listPage(req,res,next)
});



module.exports=uRoute;
