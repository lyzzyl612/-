/**
 * Created by Administrator on 2017/11/16.      clz  修改
 */

const collModal = require("../modal/perCollModal.js");
//收藏
function getColl(req,res){
    const id=req.body.userId;
    collModal.getAllCool(id).then(function(data){
        res.send({code:200,data:data});
        //console.log(data)
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
function collDel(req,res){
    const useId=req.body.userId;//传入参数用户id
    const colId=req.body.colId;//传入的为收藏的id
    collModal.del(useId,colId).then(function(data){
        res.send({code:200});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    })
}


module.exports={
    getColl,
    collDel
}