/**
 * Created by hpp on 2017/11/22.
 */
"use strict";
const storyModal = require("../modal/storyModal.js");

const storyController={
    /**
     * 1. 显示品牌故事信息
     * */
    storyList(req,res){
        let id=req.query.id;
        //console.log(id);
        storyModal.storyList(id).then((data)=>{
            //console.log(data);
            if(data.length>0){
                res.send(data);
            }else{
                res.send("err");
            }
        })
    },
    /**
     * 2. 修改品牌故事信息
     * */
    storyUpdate(req,res){
        let StoryImg=req.body.StoryImg;
        let text=req.body.text;
        let id=req.body.id;
        storyModal.storyUpdate(StoryImg,text,id).then((data)=>{
            //console.log(data);
            res.send(data);
        }).catch((err)=>{
          //console.log(err)
        })
    },
    /**
     * 3. 新增品牌故事信息
     * */
    storyAdd(req,res){
        let descStoryAdd=req.body.editorContent;
        let storyImg=req.body.storyImg;
        let id=req.body.id;
        storyModal.storyAdd(storyImg,descStoryAdd,id).then((data)=>{
            //console.log(data);
            res.send(data);
        }).catch((err)=>{
            //console.log(err)
        })
    },
    /**
     * 4. 删除品牌故事信息
     * */
    deleteStory(req,res){
        let id=req.body.id;
        storyModal.deleteStory(id).then((data)=>{
            //console.log(data);
            res.send(data);
        }).catch((err)=>{
            //console.log(err)
        })
    }
};

module.exports=storyController;