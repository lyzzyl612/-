/**
 * Created by Administrator on 2017/11/17.     clz  修改
 */
const userModal = require("../modal/perAddModal.js");

function addSave(req,res){
    let userId=req.body.userId
    let province=req.body.province;
    let city=req.body.city;
    let region=req.body.region;
    let name=req.body.name;
    let phone=req.body.phone
    let receiver=req.body.receiver;
    userModal.Add(userId,name,phone,province,city,region,receiver).then(function(data){
        res.send({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
//显示
function addList(req,res){
    let userId = req.body.userId
    userModal.list(userId).then(function(data){
        res.send({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
//删除
function del(req,res){
    let userId =req.body.userId
    addressId=req.body.addressId;
    userModal.del(userId,addressId).then(function(data){
        res.send({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
//function getAdd(req,res){
//    let id = req.body.id;
//    id = parseInt(id);
//    userModal.get(id).then(function(data){
//        res.send({code:200,data:data});
//        console.log(data);
//    }).catch(function(err){
//        console.log(err);
//        res.send({code:500});
//    });
//}
//修改
function update(req,res){
    let userId=req.body.userId
    let addressId=req.body.addressId;
    let province=req.body.province;
    let city=req.body.city;
    let region=req.body.region;
    let name=req.body.name;
    let phone=req.body.phone;
    let receiver=req.body.receiver;
    userModal.saveAdd(name,phone,province,city,region,receiver,userId,addressId).then(function(data){
        res.send({code:200,data:data});
        //console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
module.exports={
    addSave,
    addList,
    del,
    update
}