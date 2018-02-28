/**
 * Created by hpp on 2017/11/15.
 */
"use strict";
const brandModal=require("../modal/brandModal.js");
const companyModal = require("../modal/companyModal.js");

const brandController={
    /**
     * 1. 分页显示品牌信息
     **/
    pageCount:5,
    getALL(req,resp){
        //拿到页面
        let params=[];
        let listdata ,result,companyList;
        let zz,totalcount;
        params.push((req.params.br-1)*brandController.pageCount);
        params.push(brandController.pageCount);
        brandModal.getPage().then(total=>{
            //拿到总条数
            totalcount=total[0].a;
            zz=req.params.br;
            result=Math.ceil(totalcount/brandController.pageCount);
            return brandModal.allMeg(params);
        }).then(function(data){
            listdata = data;
            return companyModal.getAllCompany();
        }).then(function(data){
            companyList=data;
            return brandModal.getAllBrand();
        }).then(function(data){
            //console.log(data);
            resp.render("brand",{"brandList":data,"data":listdata,"totalPage":result,"company":companyList,"br":zz,"totalCount":totalcount});
        }).catch(function(err){
            //console.log(err);
        })
    },
    /**
     * 3. delete ,删除品牌信息
     * */
     delete(req,res){
        let id=req.body.id;
        //console.log(id);
        brandModal.delete(id).then((data)=>{
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
        let brandCom=req.body.brandCom;
        let addName=req.body.addName;
        let storyAddDesc=req.body.storyAddDesc;
        let branStory=req.body.branStory;
        let comDate=req.body.comDate;
        let brandImg=req.body.brandImg;
        //console.log(brandImg);
        brandModal.add(brandCom,addName,brandImg,storyAddDesc,branStory,comDate).then((data)=>{
            res.send(data);
        });
    },
    /**
    * 5. search ,查询品牌信息
    * */
   search(req,res){
        let name=req.body.name;
        let company=req.body.company;
        //console.log(company);
        brandModal.search(company,name).then((data)=>{
            //console.log(data);
            res.send(data);
        });
    },
    /**
     * 6. update ,查询品牌信息
     * */
   update(req,res){
        let name=req.body.name;
        let ssImg=req.body.ssImg;
        let storyTitle=req.body.storyTitle;
        let storyUpdateDesc=req.body.storyUpdateDesc;
        let storyTime=req.body.storyTime;
        let id=req.body.id;
        //console.log(storyUpdateDesc);
        brandModal.update(name,ssImg,storyUpdateDesc,storyTitle,storyTime,id).then((data)=>{
            //console.log(data);
            res.send(data);
        });
     },
    /**
     * 7. list ,默认的品牌信息
     * */
   list(req,res){
        let id=req.body.id;
        //console.log(id);
        brandModal.list(id).then((data)=>{
            //console.log(data);
            res.send(data);
        });
    },
    /**
     * 8. brandlist ,所有的品牌信息
     * */
   brandlist(req,res){
        brandModal.brandlist().then((data)=>{
            //console.log(data);
            res.send(data);
        });
    }
};

module.exports=brandController;

