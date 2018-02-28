/**
 * Created by HT on 2017/11/14 0014.
 * 评论路由模块
 */
"use strict";


//引入模块
const express = require("express");
const myRouter = express.Router();
const reviewControl = require("../controller/reviewControl.js");

//拦截请求
// myRouter.route("/review.html").get(reviewControl.ejsList);//使用ejs显示页面以及数据
myRouter.route("/startUsing.do").post(reviewControl.startUsing);//启用评论
myRouter.route("/batchStartUsing.do").post(reviewControl.startUsing);//批量启用
myRouter.route("/disable.do").post(reviewControl.disable);//禁用评论
myRouter.route("/batchDis.do").post(reviewControl.disable);//批量禁用
myRouter.route("/delete.do").post(reviewControl.delete);//删除评论
myRouter.route("/list.do").post(reviewControl.list);//请求当前页评论数据
myRouter.route("/reqTotalItem.do").post(reviewControl.reqTotalItem);//请求评论总条数
myRouter.route("/searchPagination.do").post(reviewControl.searchPagination);//查询符合查询条件的数据条数
myRouter.route("/search.do").post(reviewControl.search);//请求评论总条数

module.exports = myRouter;

