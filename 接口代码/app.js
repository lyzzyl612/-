/**
 * Created by Pengdada on 2017/11/14.
 */
//模块
const myexpress = require("express");
const bodyParser = require("body-parser"); //post
const favicon=require("serve-favicon");
const path=require("path");
const myejs=require("ejs");
const logger = require("morgan");
const session = require("express-session");
const cookieparse = require("cookie-parser");
//路由引用
const loginRoute = require("./router/loginRoute.js");  //登录
const collRoute  = require("./router/perCollRoute.js");   //收藏
const revRoute   = require("./router/perRevRoute.js");   //评论
const userRoute   = require("./router/perUserRoute.js");   //个人资料
const addressRoute   = require("./router/perAddRoute.js");   //个人地址
const customerRoute = require("./router/perCusRoute.js");    //售后
const TryRoute=require("./router/tryRoute.js");  //试戴
const newRoute=require("./router/newRoute.js");  // 潮流资讯
const orderlistRoute=require("./router/orderlistRoute.js"); //订单
const goodsRoute=require("./router/goodsRoute.js");//商城
const cartRoute=require("./router/cartRoute.js");//商城


const storeRoute =require ("./router/storeRoute.js");  // 支付页面获取收货地址
const app = myexpress();

//设置cors 用于axios发起跨域请求
app.all('*',function(request,response,next){
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","X-Requested-With");
    response.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
    response.header("Content-Type","application/json;charset=utf-8");
    next()
});





// cookie
app.use(cookieparse());
app.use(session({
    name:"testapp",
    secret:"1234",
    cookie:{maxAge:300000},
    rolling:true,
    resave:true
}));
//post
app.use(bodyParser.urlencoded({extended:false}));



// app.use(logger("dev"));
// app.use(favicon(__dirname + '/public/favicon.ico.png'));
app.set("views",__dirname+"/views");
app.engine("html",myejs.__express);//创建一个html引擎
app.set("views engine","html");



//路由使用

app.use("/login",loginRoute);

//商城
app.use("/store",storeRoute);//支付页面获取收货地址
//个人中心

   //商品收藏
app.use("/coll",collRoute);
   //评论
app.use("/rev",revRoute);
    //个人资料
app.use("/user",userRoute);

    //地址
app.use("/address",addressRoute);

    //售后
app.use("/cus",customerRoute);

app.use("/try",TryRoute);//试戴
app.use("/new",newRoute);//潮流资讯
app.use("/order",orderlistRoute);
app.use("/goods",goodsRoute);//商城
app.use("/cart",cartRoute);//商城


//=================================发送短信===============================
//appid，appkey    2.发送短信的初始化
const AV=require("leanengine");//1.发送短信的模块
AV.initialize("rumwAFf5VlgE8jAGQj7C7Usy-gzGzoHsz","1oliAQ1AOhegHmNKpn8l0qJr");
//3发送验证码
app.post("/sendSMS.do",function(request,response){
    
    let phone=request.body.txtPhone;
    //let content=request.body.txtContent;发送内容不能直接编辑；主要用于短信验证码//发送内容需要自定义短信模板；
    AV.Cloud.requestSmsCode({//调用短信的借口
        mobilePhoneNumber: phone,
        name: '应用名称',
        op: '某种操作',
        ttl: 1//时间以分钟为单位
    }).then(function(){
        response.send("ok");//发送成功
    }, function(err){
        //console.log(err)//发送失败
    });
});

//4.验证验证码是否正确
app.post("/reg.do",function(request,response){
    var phone=request.body.txtPhone;
    var code=request.body.txtCode;
    console.log(phone);
    console.log(code);
    AV.Cloud.verifySmsCode(code,phone).then(function(){
        //验证成功
        response.send("成功")
    }, function(err){
        //验证失败
        response.send("失败")
    });

});

app.use(myexpress.static(path.join(__dirname,"public")));
app.listen(1557,function(){
    console.log("启动成功!");
});