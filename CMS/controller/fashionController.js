/**
 * Created by hpp on 2017/11/23.
 */
"use strict";
const fashionModal=require("../modal/fashionModal.js");

const fashionControll={
    /**
     * 1. 分页显示品牌信息
     * */
    pageCount:3,
    getALL(req,resp){
        //拿到页面
        let params=[];
        let result,zz,totalcount;
        params.push((req.params.br-1)*fashionControll.pageCount);
        params.push(fashionControll.pageCount);
        fashionModal.getPage().then(total=>{
            //拿到总条数
            totalcount=total[0].a;
            zz=req.params.br;
            //console.log(totalcount);
            result=Math.ceil(totalcount/fashionControll.pageCount);
            return fashionModal.allMeg(params);
        }).then(function(data){
            //console.log(data);
            resp.render("fashionList",{"data":data,"totalPage":result,"br":zz,"totalCount":totalcount});
        })
    },
   /**
     * 3. delete ,切换状态
     * */
        del(req,res){
        let id=req.body.id;
        let state=req.body.state;
        //console.log(id);
        fashionModal.del(state,id).then((data)=>{
            //console.log(data);
            if(data.affectedRows>0){
                res.send({code:200});
            }else{
                res.send("err");
            }
        });
    },
    /**
     * 3.1 deleteTile ,删除品牌信息
     * */
    deleteTile(req,res){
        let id=req.body.id;
        console.log(id);
        fashionModal.deleteTile(id).then((data)=>{
            if(data.affectedRows>0){
                res.send("success");
            }else{
                res.send("err");
            }
        });
    },
   /**
     * 4. add ,增加品牌信息
   * */
   add(req,res){
        let fashionName=req.body.fashionName;
        let fashionTil=req.body.fashionTil;
        let storyAddImg=req.body.storyAddImg;
        let editorContent=req.body.editorContent;
        //console.log(editorContent);
        fashionModal.add(fashionName,storyAddImg,fashionTil,editorContent).then((data)=>{
            res.send("success");
        });
    },
    /**
     * 4.1 updateTitle ,修改文章保存
     * */
    updateTitle(req,res){
        let id=req.body.id;
        let f_artical=req.body.f_artical;
        fashionModal.updateTitle(f_artical,id).then((data)=>{
            res.send(data);
        });
    },
    /**
     * 5. search ,查询品牌信息
     * */
        search(req,res){
        let Keywords=req.body.Keywords;
        let articleName=req.body.articleName;
        //console.log(articleName);
        fashionModal.search(Keywords,articleName).then((data)=>{
            //console.log(data);
            res.send(data);
        });
    },
    /**
     * 6. update ,查询品牌信息
     * */
   update(req,res){
        let keyTit=req.body.keyTit;
        let fashionTit=req.body.fashionTit;
        let id=req.body.id;
        let img=req.body.upImg;
        //console.log(keyTit);
        fashionModal.update(keyTit,fashionTit,img,id).then((data)=>{
            res.send(data);
        });
    },
    /**
     * 7. list ,默认的品牌信息
     * */
     list(req,res){
        fashionModal.list().then((data)=>{
            //console.log(data);
            res.send(data);
        });
    },
    /**
     * 8. listFashion ,根据ID查所有的信息
     * */
     listFashion(req,res){
        let id=req.body.id;
        fashionModal.listFashion(id).then((data)=>{
            //console.log(data);
            res.send(data);
        });
    },
    /**
     * 8. addTitle ,新增文章
     * */
    addTitle(req,res){
        let id=req.body.id;
        let ff=req.body.ff;
        fashionModal.addTitle(ff,id).then((data)=>{
            res.send(data);
        });
    }
};

module.exports=fashionControll;