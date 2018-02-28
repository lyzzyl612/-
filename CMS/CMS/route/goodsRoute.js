/**
 * Created by zy on 2017/11/17.
 */
"use strict";

const myexpress = require("express");
const gRoute = myexpress.Router();
const goodsControl = require("../controller/goodsControl.js");

gRoute.route("/listAjax.do").get(goodsControl.listAjax).post(goodsControl.listAjax);//ajax加载列表
/*gRoute.route("/details.do").post(function(req,res){
    console.log("goodsControl.details");
    goodsControl.listAjax(req,res)
});//ajax加载列表*/
gRoute.route("/totalRow.do").post(goodsControl.totalRow);//获取总条数
gRoute.route("/select.do").post(goodsControl.select);//修改页面获取数据
gRoute.route("/details.do").post(goodsControl.details);//查看详情页面获取数据
gRoute.route("/dictionary.do").post(goodsControl.dictionary2);//商品风格、材质、框型、颜色
gRoute.route("/update.do").post(goodsControl.update);//确认修改数据
gRoute.route("/listBrand.do").post(goodsControl.listBrand);//获取品牌名
gRoute.route("/add.do").post(goodsControl.add);//新增商品
gRoute.route("/delete.do").post(goodsControl.del);//删除切换状态
gRoute.route("/addDict.do").post(goodsControl.addDict);//删除切换状态


module .exports = gRoute;