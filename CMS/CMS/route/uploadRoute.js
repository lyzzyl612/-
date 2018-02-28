/**
 * Created by zy on 2017/11/20.
 */
"use strict";
const myExpress=require("express");
const uploadRoute=myExpress.Router();//
const multer = require("multer");//文件上传模块
/*

var storage = multer.diskStorage({
    //设置上传后文件路径,uploads文件夹会自动创建
    destination:function(req,file,cb){
        cb(null,"./public/uploads")
    },
    //给上传的文件重命名，获取添加后缀名
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null,file.fieldname+'-'+Date.now()+"."+fileFormat[fileFormat.length-1])
    }
});

//添加配置文件到multer对象
var uploads = multer({
    storage:storage
});
*/

uploadRoute.post("/goodsImgUpload.do",function(req,res){
    //console.log(req.files);
    //uploads.single('minimg')
    var fname = req.files.minimg.path.replace("public\\uploads\\", "").replace("public/uploads/", "");
    //var filename = req.file.filename;
    fname="/uploads/"+fname;
    res.send(fname);
});
//文章富文本图片上传
uploadRoute.post("/uploadImg.do",function(req,res){
    var fname = req.files.imgFile.path.replace("public\\uploads\\", "").replace("public/uploads/", "");
    //console.log(fname)
    var info = {
        "error": 0,
        "url": "/uploads/"+fname
    };
    res.send(info);
});

module.exports = uploadRoute;