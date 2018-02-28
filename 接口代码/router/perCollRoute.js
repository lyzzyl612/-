/**
 * Created by Administrator on 2017/11/16.
 */
const myexpress = require("express");
const perCollRoute = myexpress.Router();
const perCollConreoller = require("../controller/perCollController.js");
perCollRoute.route("/coll.do").post(perCollConreoller.getColl);
perCollRoute.route("/del.do").post(perCollConreoller.collDel);


module.exports = perCollRoute;