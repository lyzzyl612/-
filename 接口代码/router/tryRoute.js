/**
 * Created by Administrator on 2017/11/14.
 */
const express=require("express");
const tRoute=express.Router();
const tControl=require("../controller/tryControll.js");
const upload=require("../common/multerUnit.js");

tRoute.route("/list.do").post(tControl.list);//点击“选择品牌”获取数据
tRoute.route("/getBrandTotolpage.do").post(tControl.brandTotol);//品牌总数
tRoute.route("/getglassTotolpage.do").post(tControl.glassTotol);//眼睛总数
tRoute.route("/tryOn.do").post(tControl.tryOn);//点击“选好了去试戴” 获取眼镜数据
tRoute.route("/chooseGlasses.do").post(tControl.chooseGlasses);//点击所选的眼镜获取数据
tRoute.route("/screen.do").post(tControl.screen);//试戴筛选
tRoute.route("/getChoise.do").post(tControl.getChoise);//试戴筛选
tRoute.route("/collection.do").post(tControl.coll);//收藏

// 如果你需要处理只有文本域的表单，你可以使用任何一个multer的方法.single(name='texFile')是上传一个文件/.array()是上传多个文件/.files()是上传多个文件
tRoute.route("/uploadImg.do").post(upload.single('txtFile'),tControl.uploadImage);//点击“上传头像”

module.exports=tRoute;
