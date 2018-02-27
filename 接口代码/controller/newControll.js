/**
 * Created by Administrator on 2017/11/16.
 */

const newModal = require("../modal/newModal.js");
//获取明星秀场的页面数据
function starShowList(request,response){
    newModal.starShowList().then(function(data){
        response.send(data)
    }).catch(function(err){
        response.send({code: 500})
    })
}
//获取品牌资讯数据
function brandNew(request,response){
    var id=request.body.id;//需要传入参数品牌的id     可以传参数也可以不用传
    newModal.brandNew(id).then(function(data){
        response.send(data)
    }).catch(function(err){
        response.send({code: 500})
    })
}
//获取时尚街拍数据
function StreetChic(request,response){
    var id=request.body.id;//需要传入参数时尚街拍的f_id     可以传参数也可以不用传
    newModal.StreetChic(id).then(function(data){
        response.send(data)
    }).catch(function(err){
        response.send({code: 500})
    })
}
//获取品牌故事数据
function brandStory(request,response){
    var id=request.body.id;//需要传入参数品牌的id     可以传参数也可以不用传
    newModal.brandStory(id).then(function(data){
        //console.log(data);
        response.send(data)
    }).catch(function(err){
        console.log(err);
        response.send({code: 500})
    })
}
//首页潮流街拍照片墙获取时尚街拍图片
function indexFashion(req,res){
    newModal.indexFashion().then(function(data){
        res.send(data)
    }).catch(function(err){
        res.send({code: 500})
    })
}


module.exports = {
    starShowList,
    brandNew,
    StreetChic,
    indexFashion,
    brandStory

};