/**
 * Created by Administrator on 2017/11/16.
 */
const myexpress = require("express");
const perRevRoute = myexpress.Router();
const perRevConreoller = require("../controller/perRevController");
perRevRoute.route("/rev.do").post(perRevConreoller.getRev);
perRevRoute.route("/del.do").post(perRevConreoller.del);

module.exports = perRevRoute;