/**
 * Created by Administrator on 2017/11/15.
 */
const myexpress = require("express");
const loginRoute = myexpress.Router();
const loginConreoller = require("../controller/loginController.js");

loginRoute.route("/login.do").post(loginConreoller.userLogin);
loginRoute.route("/*").all(loginConreoller.isLogin); //全局判断，是否进行了登录
loginRoute.route("/logout.do").post(loginConreoller.userLogout);

module.exports = loginRoute;