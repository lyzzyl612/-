/**
 * Created by Administrator on 2017/11/16.
 */
const express=require("express");
const tRoute=express.Router();
const nControl=require("../controller/newControll.js");
tRoute.route("/brandNew.do").post(nControl.brandNew);//获取品牌资讯数据
tRoute.route("/brandStory.do").post(nControl.brandStory);//获取品牌故事数据t
tRoute.route("/starShow.do").post(nControl.starShowList);//获取明星秀场数据
tRoute.route("/StreetChic.do").post(nControl.StreetChic );//获取时尚街拍数据
tRoute.route("/indexFashion.do").post(nControl.indexFashion );//首页获取潮流街拍图片


module.exports=tRoute;