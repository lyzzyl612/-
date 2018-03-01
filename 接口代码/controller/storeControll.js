/**
 * Created by zy on 2017/12/18.
 */
"use strict";
const storeModal = require("../modal/storeModal.js");
let id=1;
module.exports={
    getStore:function(req,res){
    let g_id=req.body.g_id;
    console.log("11111111111111366666666666666666666666");
    console.log(g_id);
    storeModal.getAllstore([g_id]).then(function(data){
        res.send({code:200,data:data});
        console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
},
    buybuy:function(req,res){
        let g_id=req.body.g_id;
        let u_id=req.body.u_id;

        storeModal.tobuy([g_id,u_id]).then(function(data){
            res.send({code:200,data:data});
            console.log(data);
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
},


    //获取收货地址数据
    address:function(req,res){
        var userid=req.body.uid;
        console.log(userid);
        storeModal.address(userid).then(function(data){
            res.send(data)
        }).catch(function(err){
            res.send({code: 500})
        })
    },
    //支付页面获取商品订单
    goodsOrder:function(req,res){
        var u_id = req.body.userid;
        storeModal.goodsOrder(u_id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send({code: 500})
        })
    },
    //支付页面保存确认订单

    orderSave:function(req,res){
        var date=new Date();
        id+=1;
        let o_u_id = req.body.o_u_id;   //用户id
        let o_a_id = req.body.o_a_id;   //收货地址id
        let o_num = date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate().toString()+id.toString();   //订单编号
        let o_amount = req.body.o_amount;   //订单金额
        let o_state = req.body.o_state;   //已支付
        let o_logistNum = req.body.o_logistNum;   //物流编号
        let o_underline = req.body.o_underline;  //线上
        let o_deposit = req.body.o_deposit;  //没有交押金
        let booking_day = req.body.booking_day;  //预约星期
        let booking_time = req.body.booking_time;  //预约时间段
        let booking_remark = req.body.booking_remark;  //留言备注
        console.log(o_num);
        storeModal.orderSave([o_u_id,o_a_id,o_num,o_amount,
            o_state,o_logistNum,o_underline,o_deposit,
            booking_day,booking_time,booking_remark]).then(function(data){
            res.send(data);
            console.log(data);
        }).catch(function(err){
            res.send({code: 500})
            console.log(err);
        })
    }
};

