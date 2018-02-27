/**
 * Created by hpp on 2017/11/17.
 */
"use strict";
const companyModal=require("../modal/companyModal.js");

const companyController={
    /**
     * 1. 分页显示公司信息
     * */
    pageCount:5,
    getALL(req,resp){
        //拿到页面
        let params=[];
        let listdata ,result,zz;
        params.push((req.params.br-1)*companyController.pageCount);
        params.push(companyController.pageCount);
        companyModal.getPage().then(total=>{
            //拿到总条数
            zz=req.params.br;
            result=Math.ceil(total[0].a/companyController.pageCount);
            return companyModal.allMeg(params);
        }).then(function(data){
            listdata = data;
            return companyModal.getAllCompany();
        }).then(function(data){
            resp.render("companyList",{"company":data,"data":listdata,"totalPage":result,"br":zz});
        }).catch(function(err){
            console.log(err);
        })
    },
    /**
     * 3. delete ,删除公司信息
     * */
        delete(req,res){
        let id=req.body.id;
        //console.log(id);
        companyModal.delete(id).then((data)=>{
            res.send("success");
        });
    },
    /**
     * 4. add ,增加公司信息
     * */
        add(req,res){
        let compName=req.body.compName;
        let compAddress=req.body.compAddress;
        let compPeo=req.body.compPeo;
        let compPeoPhone=req.body.compPeoPhone;
        let comPhone=req.body.comPhone;
        let comDate=req.body.comDate;
        companyModal.add(compName,compAddress,compPeo,compPeoPhone,comPhone,comDate)
            .then((data)=>{
                res.send(data);
            });
    },
    /**
     * 5. search ,查询公司信息
     * */
        search(req,res){
        let companyName=req.body.companyName;
        let compPeople=req.body.compPeople;
        let peoplePhone=req.body.peoplePhone;
        let compPhone=req.body.compPhone;
        //console.log(companyName);
        companyModal.search(companyName,compPeople,peoplePhone,compPhone)
        .then((data)=>{
                res.send(data);
            })

    },
    /**
     * 6. update ,修改公司信息
     * */
        update(req,res){
        let comName=req.body.comName;
        let comAddress=req.body.comAddress;
        let comPeo=req.body.comPeo;
        let comPeoPhone=req.body.comPeoPhone;
        let comPone=req.body.comPone;
        let id=req.body.id;
        //console.log(name);
        companyModal.update(comName,comAddress,comPeo,comPeoPhone,comPone,id)
        .then((data)=>{
                res.send(data);
            });
    },
    /**
     * 7. list ,默认的公司信息
     * */
        list(req,res){
        let id=req.body.id;
        //console.log(id);
        companyModal.list(id).then((data)=>{
            res.send(data);
        });
    }

};

module.exports=companyController;