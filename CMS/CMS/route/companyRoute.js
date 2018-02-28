/**
 * Created by hpp on 2017/11/17.
 */
"use strict";
const myExpress=require("express");
const companyRoute=myExpress.Router();//使用express的router，会返回一个路由对象
const companyControll=require("../controller/companyController.js");


companyRoute.route("/delete.do").post(companyControll.delete);//删除
companyRoute.route("/add.do").post(companyControll.add);//添加
companyRoute.route("/search.do").post(companyControll.search);//查询
companyRoute.route("/update.do").post(companyControll.update);//修改
companyRoute.route("/list.do").post(companyControll.list);//默认的数据


module.exports=companyRoute;