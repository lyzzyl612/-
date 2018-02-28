/**
 * Created by lyz on 2017/11/15.
 */
"use strict";
const orderModal = require("../modal/orderModal.js");
module.exports={
    //listView(req,res){
    //    orderModal.list(10,1,function(err,data){
    //        res.render("orderList",{"data":data})
    //    })
    //},
    update(req,res){
        let o_amount = (req.method == "POST")?req.body.o_amount:req.query.o_amount;
        o_amount=parseInt(o_amount);
        let o_underline = (req.method == "POST") ? req.body.o_underline : req.query.o_underline;
        o_underline=parseInt(o_underline);
        let o_deposit = (req.method == "POST")?req.body.o_deposit:req.query.o_deposit;
        o_deposit=parseInt(o_deposit);
        let orderId = (req.method == "POST")?req.body.orderId:req.query.orderId;
        orderId=parseInt(orderId);
        let a_province = (req.method == "POST")?req.body.a_province:req.query.a_province;
        let a_city = (req.method == "POST")?req.body.a_city:req.query.a_city;
        let a_region = (req.method == "POST")?req.body.a_region:req.query.a_region;
        let a_details = (req.method == "POST")?req.body.a_details:req.query.a_details;


        orderModal.update([o_amount,o_underline,o_deposit,a_province,a_city,a_region,a_details,orderId]).then(function(data){

            if(data.affectedRows>0){
                res.send("修改成功");

            }else{
                res.send("失败");

            }
        }).catch(function(err){
            res.send("数据出错");
        })
    },
    select(req,res){
        let id = (req.method == "POST") ? req.body.id : req.query.id;


        orderModal.select(id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send("数据出错");
        })
    },
    list(req,res){
        let name=req.session.userName;
        //let o_state = (req.method == "POST")?req.body.o_state:req.query.o_state;
        //let o_under = (req.method == "POST") ? req.body.o_under : req.query.o_under;
        //let o_dep = (req.method == "POST") ? req.body.o_dep : req.query.o_dep;
        let pageData,totalPage,orderList,pageSize;

        orderModal.list(null,null,null,null,null,1).then(function(data) {
            pageSize = data.pageSize;
            pageData = data.data;


            //console.log(pageData)
        }).catch(function(err){

            //res.send("数据出错,请联系管理员1");
        }).then(function(){
            orderModal.totalRow().then(function(da){
                totalPage = Math.ceil(da[0].num/pageSize);


            }).catch(function(err){

                res.send("数据出错,请联系管理员2");
            })
        }).then(function(){
            orderModal.listJob().then(function(job){
                orderList = job;

                res.render("orderList.html",{"data":pageData,"name":name,"totalPage":totalPage,"order":orderList});
            }).catch(function(err){

                res.send("数据出错,请联系管理员3");
            })
        });
        //});
    },

    //ajax页面加载时的请求
    listPage(req,res){
        let o_state = (req.method == "POST")?req.body.o_state:req.query.o_state;
        let o_under = (req.method == "POST") ? req.body.o_under : req.query.o_under;
        let o_dep = (req.method == "POST") ? req.body.o_dep : req.query.o_dep;
        let selName = (req.method == "POST") ? req.body.selName : req.query.selName;
        let selLog = (req.method == "POST") ? req.body.selLog : req.query.selLog;
        let pageSize = (req.method == "POST")?req.body.pageSize:req.query.pageSize;

        let currentPage = (req.method == "POST") ? req.body.currentPage : req.query.currentPage;

        orderModal.list(o_state,o_under,o_dep,selName,selLog,currentPage,pageSize).then(function(data){

            res.send(data.data);


        }).catch(function(err){
            res.send("数据出错");
        });
    },
    totalRow(req,res){

        return new Promise((resolve,reject)=>{
            orderModal.totalRow().then(function(data){
                res.send(data);

            }).catch(function(err){
                res.send("数据出错");
            })
        })
    }

}