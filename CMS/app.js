/**
 * Created by Administrator on 2017/10/23.
 */
"use strict";
const myexpress = require("express");
const bodyParser = require("body-parser");//转换post数据
const mypath = require("path");
const myapp = myexpress();//创建一个项目实例
const myejs = require("ejs");//引用ejs模块
const session = require("express-session")//引用session模块
const cookieparse = require("cookie-parser");//引用cookie模块
const logger = require("morgan");//引用日志模块
const AV = require("leanengine");//发送短信的模块
const multer = require("multer");//文件上传模块
const multiparty = require("connect-multiparty");//ajax上传文件
const fs = require("fs");

//路由引用
const viewRoute = require("./route/viewRoute");//ejs路由
const goodsRoute = require("./route/goodsRoute");//商品路由
const orderRoute = require("./route/orderRoute.js");//订单路由
const brandRoute=require("./route/brandRoute.js");//品牌-hpp
const companyRoute=require("./route/companyRoute.js");//品牌-hpp
const userRoute = require("./route/userRoute.js");
const uploadRoute= require("./route/uploadRoute.js");
const reviewRoute = require("./route/reviewRoute.js");
const fashionRoute = require("./route/fashionRoute.js");


myapp.use(bodyParser.urlencoded({extended: false})); //读取post数据

//上传文件配置
myapp.use(multer({dest:'./public/uploads',rename:function (filedname,filename) {
    return filename+"_"+Date.now();
}}));

/*
myapp.post("/uploadFile.do",upload.single('textFile'),function(req,res){
    console.log(req.file);
    var filename = req.file.filename;
    res.send("/uploads/"+filename);
});
*/


myapp.use(logger("dev"));
myapp.use(cookieparse());
myapp.use(session({
        secret: '123456',
        name: 'testapp',
        cookie: {maxAge: 60000000000},
        rolling: true,
        resave: true
    })
);
//配置视图模板
myapp.set("views", __dirname + "/view");
myapp.engine("html", myejs.__express);
myapp.set("view engine", "html");




//路由分发
//myapp.use("/review",reviewRoute);
myapp.use("/", viewRoute);
myapp.use("/", uploadRoute);//上传文件
myapp.use("/goods", goodsRoute);//商品路由
myapp.use("/order",orderRoute);//订单路由
myapp.use("/brand",brandRoute);//品牌-hpp
myapp.use("/companyList",companyRoute);//公司-hpp
myapp.use("/user",userRoute);//用户-hpp
myapp.use("/review",reviewRoute);//评论路由
myapp.use("/fashionList",fashionRoute);//资讯路由



myapp.use(myexpress.static(__dirname + "/public"));//配置静态地址

AV.initialize("k9Ngykd6uvqad87ulY7Df1Qj-gzGzoHsz", "7hfYskAwoYrXkvpkpypD5lv4");
myapp.post("/sendSMS.do", function (req, res) {
    //var textPhone=$("#textPhone").val();
    //var phone = req.body.textPhone;
    let phone = req.body.textPhone;
    console.log(phone);
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: phone,
        name: 'double',
        op: '注册验证',
        ttl: 1
    }).then(function () {
        res.send('ok');
    }, function (err) {
        console.log(err)
    })
});
myapp.listen(8888, function (req, res) {
    console.log("服务启动")
});
