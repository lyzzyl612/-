/**
 * Created by Administrator on 2017/11/17.
 */
const myexpress = require("express");
const perAddRoute = myexpress.Router();
const perAddConreoller = require("../controller/perAddController.js");
perAddRoute.route("/add.do").post(perAddConreoller.addSave);
perAddRoute.route("/list.do").post(perAddConreoller.addList);
perAddRoute.route("/del.do").post(perAddConreoller.del);
perAddRoute.route("/update.do").post(perAddConreoller.update);  //修改
module.exports = perAddRoute;