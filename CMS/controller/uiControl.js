/**
 * Created by zy on 2017/12/5.
 * uiControl:执行层
 *  用户头像图片，相关的操作
 */
"use strict";

const uiModal = require("../modal/uiModal.js");

module.exports ={
    /**
     * 1.listEjs ejs加载页面
     */
    listEjs(req,res){
        uiModal.list().then(function(data){

        }).catch(function(){

        }).then(function(){
            uiModal.totalRow().then(function(data){

            }).catch(function(){

            })
        })
    }
};

