/**
 * Created by hpp on 2017/11/23.
 */
"use strict";
const myExpress=require("express");
const fashionRoute=myExpress.Router();//
const fashionControll=require("../controller/fashionController.js");


fashionRoute.route("/search.do").post(fashionControll.search);//条件查询
fashionRoute.route("/list.do").post(fashionControll.listFashion).get(fashionControll.list);//查询所有
fashionRoute.route("/deleteFas.do").post(fashionControll.del);//切换状态
fashionRoute.route("/deleteTile.do").post(fashionControll.deleteTile);//删除文章
fashionRoute.route("/update.do").post(fashionControll.update);//修改数据
fashionRoute.route("/add.do").post(fashionControll.add);//添加数据
fashionRoute.route("/updateTitle.do").post(fashionControll.updateTitle);////修改文章保存
fashionRoute.route("/addTitle.do").post(fashionControll.addTitle);////新增文章保存

module.exports=fashionRoute;