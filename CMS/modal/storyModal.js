/**
 * Created by hpp on 2017/11/22.
 */
"use strict";
const db=require("./sqlPool.js");

module.exports={
    /**
     * 1. storyList ,查询所有数据
     * */
     storyList(id){
        return new Promise((resolve,reject)=>{
            let sql=`select * from story where s_id=? and s_state=1`;
            db.pool.query(sql,id,(err,data)=>{
                //console.log(data);
                resolve(data);
            })
        })
    },
    /**
     * 2. 修改品牌故事信息
     * */
    storyUpdate(StoryImg,text,id){
        return new Promise((resolve,reject)=>{
            let sql=`update story set s_img=?,s_production=? where s_id=?`;
            db.pool.query(sql,[StoryImg,text,id],(err,data)=>{
                //console.log(data);
                resolve(data);
            }).catch((err)=>{
                console.log(err)
            })
        })
    },
    /**
     * 3. 新增品牌故事信息
     * */
    storyAdd(storyImg,descStoryAdd,id){
        return new Promise((resolve,reject)=>{
            let sql=`update story set s_img=?,s_production=? where s_id=?`;
            db.pool.query(sql,[storyImg,descStoryAdd,id],(err,data)=>{
                console.log(err);
                resolve(data);
            })
        })
    },
    /**
     * 4. 删除品牌故事信息
     * */
    deleteStory(id){
        return new Promise((resolve,reject)=>{
            let sql=`update story set s_img=null,s_production=null where s_id=?`;
            db.pool.query(sql,[id],(err,data)=>{
                //console.log(data);
                resolve(data);
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
}
;