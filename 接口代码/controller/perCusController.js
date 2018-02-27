/**
 * Created by Administrator on 2017/11/20.
 */
const cusModal = require("../modal/perCusModal.js");


//显示
function list(req,res){
    console.log("1111111111");
    let id = req.body.id;
    id = parseInt(id);
    cusModal.list(id).then(function(data){
        res.send({code:200,data:data});
        console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
//删除
function del(req,res){
    console.log("1111111111");
    let id = req.body.id;
    id = parseInt(id);
    cusModal.del(id).then(function(data){
        res.send({code:200,data:data});
        console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
//取消退款
function cancel(req,res){
    console.log("1111111111");
    let id = req.body.id;
    id = parseInt(id);
    cusModal.can(id).then(function(data){
        res.send({code:200,data:data});
        console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
module.exports={
    list,
    del,
    cancel
}