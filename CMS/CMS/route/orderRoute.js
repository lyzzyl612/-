/**
 * Created by lyz on 2017/11/16.
 */
"use strict";
const myexpress = require("express");
const oRoute = myexpress.Router();
const orderControl = require("../controller/orderController.js");

oRoute.route("/list.do").get(orderControl.listPage).post(orderControl.listPage);

oRoute.route("/update.do").get(orderControl.update).post(orderControl.update);
oRoute.route("/select.do").get(orderControl.select).post(orderControl.select);

oRoute.route("/totalRow.do").get(orderControl.totalRow).post(orderControl.totalRow);

module.exports = oRoute;