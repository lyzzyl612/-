/**
 * Created by zy on 2017/12/18.
 * 商城路由
 */
"use strict";

const express=require("express");
const sRoute=express.Router();
const storeControl=require('../controller/storeControll.js');

sRoute.route("/address.do").post(storeControl.address);//支付页面获取收货地址
sRoute.route("/goodsOrder.do").post(storeControl.goodsOrder);//支付页面获取商品订单
sRoute.route("/orderSave.do").post(storeControl.orderSave);//保存确认订单
sRoute.route("/list.do").post(storeControl.getStore);//获取页面数据
sRoute.route("/update.do").post(storeControl.buybuy);//点击购买 ，传值到数据库shopping_cart
module.exports=sRoute;

