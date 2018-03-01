/**
 * Created by Administrator on 2017/11/14.
 */
const fs=require("fs");
const path = require("path");
const tryModal = require("../modal/tryModal.js");

//收藏
function coll(resquest, response) {
    var userId = resquest.body.userId;
    var goodsId = resquest.body.goodsId;
    tryModal.coll(userId,goodsId).then(function(data){

        response.send(data);
    }).catch(function (err) {
        response.send(err);
    })
}

//获取穿过来id的商品
function getChoise(resquest, response) {
    var par = resquest.body;
    tryModal.getChoisem(par).then(function(data){

        response.send(data);
    }).catch(function (err) {
        response.send(err);
    })
}
//获取品牌总数
function brandTotol(resquest, response) {

    tryModal.getbrandnum().then(function(data){

        response.send(data);
    }).catch(function (err) {
        response.send(err);
    })
}
//获取查询到商品总数
function glassTotol(resquest, response) {
    var brand = resquest.body.brand;
    tryModal.getglassnum(brand).then(function(data){

        response.send(data);
    }).catch(function (err) {
        response.send(err);
    })
}

//点击“选择品牌”获取数据
function list(request,response){
    let pagesize1 = request.body.logopagesize;
    let pagenum1 = request.body.logopagenum;
    // let pagesize2 = request.body.gpagesize;
    // let pagenum2 = request.body.gpagenum;
    var brand;//品牌信息
    var frame;//框型信息
    var material;//材质信息
    var style;//风格信息
    var glasses;//眼镜信息
    var color//眼镜颜色
    tryModal.listBrand(pagesize1,pagenum1).then(function(data){
        brand=data;
    }).then(function(){
        tryModal.frame().then(function(data){
            frame=data;
        })
    }).then(function(){
        tryModal.material().then(function(data){
            material=data;
        })
    }).then(function(){
        tryModal.style().then(function(data){
            style=data;
        })
    }).then(function(){
         tryModal.color().then(function(data){
             color=data
         })
    }).then(function(){
        tryModal.glasses().then(function(data){
            glasses=data;
            response.send({brand:brand,frame:frame,material:material,style:style,color:color,glasses:glasses});
        })
    }).catch(function (err) {
        response.send(err)
    })
}

//===================================================================
//点击“选好了去试戴” 获取眼镜数据
function tryOn(resquest, response) {
    var id=resquest.body.id;//传参数选中眼镜g_id
    if(id != undefined){
        tryModal.tryOn(id).then(function (data) {
            response.send(data);
        }).catch(function (err) {
            response.send({code: 500})
        })
    }else {
        response.send("1");
    }
}

//==========================================================

//点击所选的眼镜获取数据  品牌图片 品牌故事 商品颜色 商品图片
function chooseGlasses(resquest, response) {
    var id=resquest.body.id;//需要传入的参数商品表的g_id
    var ShowPhoto;// 品牌图片
    var brandMessage;//品牌故事
    var brandColors;//商品颜色种类
    var imgthumb;//商品图片
    tryModal.chooseShowPhoto(id).then(function (data) {
        ShowPhoto=data;
    }).then(function(){
        tryModal.chooseBrandMessage(id).then(function(data){
            brandMessage=data;
        })
    }).then(function(){
        tryModal.chooseBrandColors(id).then(function(data){
            brandColors=data;
        })
    }).then(function(){
        tryModal.chooseImgthumb(id).then(function(data){
            imgthumb=data;
            response.send({"ShowPhoto":ShowPhoto,"brandMessage":brandMessage,
                "brandColors":brandColors,"imgthumb":imgthumb
            })
        })
    }).catch(function (err) {
        response.send({code: 500})
    })
}

//=====================试戴筛选===========================================================================
// function screen(request,response){
//     var brand=request.body.brand;//需要传入参数的b_id                 品牌
//     var sex=request.body.sex;// 需要出入参数 0 ，1                      性别
//     var style=request.body.style;// 需要出入参数 字典表dict_id         风格
//     var material=request.body.material;// 需要出入参数 字典表dict_id   材质
//     var frame=request.body.frame;// 需要出入参数 字典表dict_id         框型
//     var type=request.body.type;//需要传入参数   0，1                    太阳镜或者眼镜
//     tryModal.screen(brand,sex,style,material,frame,type).then(function(data){
//         response.send(data);
//     }).catch(function(err){
//         response.send({code: 500})
//     })
// }
function screen(request,response){
    let pagesize2 = request.body.gpagesize1;
    let pagenum2 = request.body.gpagenum1;
    var brand=request.body.brand;//需要传入参数的b_id                 品牌
    brand= parseInt(brand);
    tryModal.screen(pagesize2,pagenum2,brand).then(function(data){
        response.send(data);
    }).catch(function(err){
        response.send({code: 500})
    })
}

//===============试戴预览================================================================
//上传头像
function uploadImage(request,response){
    //文件名
    var filename=request.file.originalname;
    //文件路径
    var targetPath = "d:/node.js 文件/webroot/public/image/" + filename;
    //返回信息到客户端
    response.json({code: 200, msg: {url: 'image/' + filename}});
    //保存图片到数据库
    tryModal.TryItEffect(targetPath).then(function(data){
    }).catch(function(err){
        console.log(err)
    })
}

module.exports = {
    tryOn,
    chooseGlasses,
    screen,
    uploadImage,
    list,
    brandTotol,
    glassTotol,
    getChoise,
    coll
};