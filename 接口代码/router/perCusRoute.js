/**
 * Created by Administrator on 2017/11/20.
 */
const myexpress = require("express");
const perCusRoute = myexpress.Router();
const perCusConreoller = require("../controller/perCusController.js");
perCusRoute.route("/list.do").post(perCusConreoller.list);
perCusRoute.route("/del.do").post(perCusConreoller.del);
perCusRoute.route("/cancel.do").post(perCusConreoller.cancel);
module.exports = perCusRoute;