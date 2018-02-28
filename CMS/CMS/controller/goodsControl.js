/**
 * Created by zy on 2017/11/15.
 * goodsControl:执行层
 *商品表，相关的操作
 */
"use strict";

const goodsModal = require("../modal/goodsModal.js");

module .exports = {
    /**
     *1.新增商品的操作
     */
    add(req,res){
        let abrandName = req.body.abrandName;
        let agoodsName = req.body.agoodsName;
        let minimg = req.body.minimg;
        let asex = req.body.asex;
        let abid = req.body.abid;
        let asale = req.body.asale;
        let apromotion = req.body.apromotion;
        let aweight = req.body.aweight;
        let aouter = req.body.aouter;
        let awidth = req.body.awidth;
        let aleg = req.body.aleg;
        let ainner = req.body.ainner;
        let aheight = req.body.aheight;
        let aunderline = req.body.aunderline;
        let acount = req.body.acount;
        let atype = req.body.atype;
        let astyle = req.body.astyle;
        let amaterial = req.body.amaterial;
        let aframe = req.body.aframe;
        let acolor = req.body.acolor;
        //console.log("caizhi",amaterial);
        //console.log("kuang",req.body);
        console.log("kuang",minimg);


        goodsModal.add([abrandName,minimg,agoodsName,asex,abid,asale,apromotion,
            aweight,aouter,awidth,aleg,ainner,aheight,aunderline,acount,atype,
            acolor,astyle,amaterial,aframe]).then(function(da){
            if(da.affectedRows>0){
                res.json({code:200});
            }else{
                res.send("新增失败");
            }
        }).catch(function(err){
            console.log("add"+err);
            res.json({code:500});
        })
    },
    /**
     *2.改变状态的操作
     */
    del(req,res){
        let id = req.body.id;
        let state = req.body.state;
        goodsModal.del(state,id).then(function(data){
            if(data.affectedRows>0){
                res.json({code:200});
            }else{
                res.send("失败");
            }
        }).catch(function(err){
            console.log(err);
            res.json({code:500});
        })
    },
    /**
     *3.确认修改数据的操作
     */
    update(req,res){
        let upSrc = req.body.upSrc;
        let upgoodsName = req.body.upgoodsName;
        let upBrand = req.body.upBrand;
        let upBid = req.body.upBid;
        let upSale = req.body.upSale;
        let upPromotion = req.body.upPromotion;
        let upWeight = req.body.upWeight;
        let upOuter = req.body.upOuter;
        let upWidth = req.body.upWidth;
        let upLeg = req.body.upLeg;
        let upInner = req.body.upInner;
        let upHeight = req.body.upHeight;
        let upUnderline = req.body.upUnderline;
        let upsex = req.body.upsex;
        let upStock = req.body.upStock;
        let upstyle = req.body.upstyle;
        let upmaterial = req.body.upmaterial;
        let upframe = req.body.upframe;
        let upcolor = req.body.upcolor;
        let upid = req.body.upid;

        goodsModal.update([upSrc,upgoodsName,upBrand,upBid,upSale,upPromotion, upWeight,upOuter,upWidth,upLeg,upInner,upHeight,
            upUnderline,upsex,upStock,upstyle,upmaterial,upframe,upcolor,upid]).then(function(data){
            //console.log(data);
            if(data.affectedRows>0){
                res.json({code:200});
            }else{
                res.json({code:500});
            }
        }).catch(function(err){
            res.json({code:500});
        })
    },
    /**
     *4.修改页面获取值的操作
     */
    select(req,res){
        let id = req.body.id;
        goodsModal.select(id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.json({code:500});
            console.log("select:"+err);
        })
    },
    /**
     * 5.详情页面获取值
     */
    details(req,res){
        let detaId = req.body.detaId;
        goodsModal.select(detaId).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.json({code:500});
            console.log("select:"+err);
        })
    },
    /**
     * 6.ejs请求的商品列表页面
     */
    listEjs(req,res){
        let pageData,totalPage,pageSize,brandList,totalCount;
        goodsModal.list(null,null,null,null,null,null,1).then(function(data){
            //console.log(data);
            pageSize = data.pageSize;
            pageData = data.data;
        }).catch(function(err){
            console.log("list"+err);
            res.send("list err");
        }).then(function(){
            goodsModal.totalRow(null,null,null,null,null).then(function(da){

                totalCount = da[0].num;
                totalPage = Math.ceil(da[0].num/pageSize);
                //console.log(totalPage);
            }).catch(function(err){
                console.log("totalRow"+err);
                res.send("totalRow err");
            }).then(function(){
                goodsModal.listBrand().then(function(brand){
                    brandList = brand;
                    console.log(brand)
                    res.render("goodsList.html",{"data":pageData,"totalPage":totalPage,"brandList":brand,"totalCount":totalCount})
                }).catch(function(err){
                    console.log("listBrand"+err);
                    res.send("listBrand err");
                })
            });
        })
    },
    /**
     * 7.ajax请求的页面
     */
    listAjax(req,res){

        let goodsName = req.query.goodsName;
        let brand = req.query.brand;
        let sex = req.query.sex;
        let underline = req.query.underline;
        let state = req.query.state;
        let pageSize = req.query.pageSize;
        let currentPage =  req.query.currentPage;
        //console.log(req.query);
        //console.log(sex);
        goodsModal.list(goodsName,brand,sex,underline,state,pageSize,currentPage).then(function(data){
            res.send(data.data);
        }).catch(function(err){
            console.log(err);
            res.send("listAjax err");
        });
    },
    /**
     * 8.请求总条数
     */
    totalRow(req,res){
        let goodsName = req.body.goodsName;
        let brand = req.body.brand;
        let sex = req.body.sex;
        let underline = req.body.underline;
        let state = req.body.state;
        goodsModal.totalRow(goodsName,brand,sex,underline,state).then(function(data){
            res.send(data);
        }).catch(function(err){
            console.log(err);
            res.send("totalRow err");
        })
    },
    /**
     * 9.请求商品风格、材质、框型、颜色
     */
    dictionary2(req,res){
        console.log("============================")
        var style, material, frame;
        goodsModal.dictionary("风格").then(function (data) {
               style = data;
               return goodsModal.dictionary("材质");
             }) .then(function (data) {
                 material = data;
                  return goodsModal.dictionary("边框");
            }).then(function (data) {
                  frame = data;
                   return  goodsModal.dictionary("颜色");
            }).then(function (data) {
                   let obj = {"gstyle": style, "gmaterial": material, "gframe": frame, "gcolor": data};
                    res.json(obj);

            }).catch(function(){
                throw  new Error("error");
            });
    },
    /**
     * 10.请求品牌名称
     */
    listBrand(req,res){
        goodsModal.listBrand().then(function(data){
            res.send(data)
        }).catch(function(err){
            console.log("listBrand"+err);
            res.send("listBrand err");
        })
    },
    /**
     * 11.新增风格、材质、框型、颜色
     */
    addDict(req,res){
        let value = req.body.dict_value;
        let name = req.body.dict_name;
        goodsModal.addDict(value,name).then(function(data){

            if(da.affectedRows>0){
                res.json({code:200});
            }else{
                res.send("新增失败");
            }
        }).catch((err)=>{
            res.json({"code":500})
        })
    }
};
