/**
 * Created by Administrator on 2017/11/16.
 */
const myexpress = require("express");
const perUserRoute = myexpress.Router();
const perUserConreoller = require("../controller/perUserController.js");
perUserRoute.route("/update.do").post(perUserConreoller.userSave);
perUserRoute.route("/list.do").post(perUserConreoller.userList);
perUserRoute.route("/region.do").post(perUserConreoller.region);




perUserRoute.route("/order.do").post(perUserConreoller.orderList);
perUserRoute.route("/LpwdChange.do").post(perUserConreoller.LpwdChange);
perUserRoute.route("/PpwdChange.do").post(perUserConreoller.PpwdChange);
perUserRoute.route("/emailChange.do").post(perUserConreoller.emailChange);
perUserRoute.route("/updatePhone.do").post(perUserConreoller.updatePhone);




module.exports = perUserRoute;