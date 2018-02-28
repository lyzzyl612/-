/**
 * Created by HT on 2017/11/15 0015.
 * 评论业务层
 */
"use strict";

const reviewModal = require("../modal/reviewModal.js");

module.exports = {
    //启用评论
    startUsing(req, res){
        let rId = req.body.r_id;
        reviewModal.startUsing(rId)
            .then(function (data) {
                if (data.affectedRows > 0) {
                    res.send("success");
                } else {
                    res.send("fail");
                }
            })
            .catch(function (err) {
                res.send("数据出错，请联系管理员！")
            })
    },
    //禁用评论
    disable(req,res){
        let rId = req.body.r_id;
        reviewModal.disable(rId)
            .then(function (data) {
                if (data.affectedRows > 0) {
                    res.send("success");
                } else {
                    res.send("fail");
                }
            })
            .catch(function (err) {
                res.send("数据出错，请联系管理员！")
            })
    },
    //删除评论
    delete(req,res){
        let rId = req.body.r_id;
        reviewModal.delete(rId)
            .then(function (data) {
                if (data.affectedRows > 0) {
                    res.send("success");
                } else {
                    res.send("fail");
                }
            })
            .catch(function (err) {
                res.send("数据出错，请联系管理员！")
            })
    },
    //请求总数据条数
    reqTotalItem(req, res){
        reviewModal.reqTotalItem()
            .then(function (data) {
                res.send(data);
            })
            .catch(function (err) {
                res.send("数据出错，请联系管理员！")
            })
    },
    //请求每页数据
    list(req,res){
        let nowPage = req.body.nowPage;
        let perPageItem = req.body.perPageItem;
        reviewModal.list(nowPage,perPageItem)
            .then(function (data) {
                res.send(data);
            })
            .catch(function (err) {
                console.log(err);
                res.send("数据出错，请联系管理员！")
            })
    },
    //请求符合查询条件的数据条数
    searchPagination(req,res){
        let rId = req.body.r_id;
        let uId = req.body.u_id;
        let oId = req.body.o_id;
        let rState = req.body.state;
        reviewModal.searchPagination(rId,uId,oId,rState)
            .then(function (data) {
                res.send(data);
            })
            .catch(function (err) {
                console.log(err);
                res.send("数据出错，请联系管理员！")
            })
    },
    //请求符合查询条件的数据
    search(req,res){
        let rId = req.body.r_id;
        let uId = req.body.u_id;
        let oId = req.body.o_id;
        let rState = req.body.state;
        let nowPage = req.body.nowPage;
        let perPageItem = req.body.perPageItem;
        reviewModal.search(rId,uId,oId,rState,nowPage,perPageItem)
            .then(function (data) {
                res.send(data);
            })
            .catch(function (err) {
                console.log(err);
                res.send("数据出错，请联系管理员！")
            })
    }


};