/**
 * Created by hpp on 2017/11/15.
 */
"use strict";
const myExpress=require("express");
const brandRoute=myExpress.Router();//
const brandControll=require("../controller/brandController.js");
const storyControll=require("../controller/storyController.js");

brandRoute.route("/delete.do").post(brandControll.delete);//删除
brandRoute.route("/add.do").post(brandControll.add);//添加
brandRoute.route("/search.do").post(brandControll.search);//查询
brandRoute.route("/update.do").post(brandControll.update);//修改
brandRoute.route("/list.do").post(brandControll.list).get(brandControll.brandlist);//默认的数据

brandRoute.route("/storyList.do").get(storyControll.storyList);//默认查看的数据
brandRoute.route("/storyUpdate.do").post(storyControll.storyUpdate);//修改故事的数据
brandRoute.route("/storyAdd.do").post(storyControll.storyAdd);//新增故事的数据
brandRoute.route("/deleteStory.do").post(storyControll.deleteStory);//删除故事的数据

module.exports=brandRoute;