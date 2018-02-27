/**
 * Created by Administrator on 2017/11/16.    clz  修改
 */
const revModal = require("../modal/perRevModal.js");
function getRev(req,res){
    let id=req.body.userId;
    revModal.getAllRev(id).then(function(data){
        res.send({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
function del(req,res){
    var userId=req.body.userId;
    var revId=req.body.revId;
    revModal.del(userId,revId).then(function(data){
        res.send({code:200,data:data});
        //console.log(data);
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
module.exports={
    getRev,
    del
}