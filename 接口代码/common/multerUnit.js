
/**
 * Created by zy on 2017/11/20.
 */
"use strict";


const multer = require("multer");//文件上传模块

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
var upload = multer({
    storage:storage
});




module.exports = upload;