/**
 * Created by lyz on 2017/12/19.
 */
"use strict";
const myexpress = require("express");
const orderlistRoute = myexpress.Router();
const orderController = require("../controller/orderController");
orderlistRoute.route("/listall.do").post(orderController.getOrder1);


module.exports = orderlistRoute;