/**
 * Created by hpp on 2017/11/15.
 * DAO层：数据层
 * 品牌相关
 */
"use strict";
const db=require("./sqlPool.js");

module.exports={
    /**
     * 1. allMeg ,一页显示几条数据
     * */
        allMeg(params){
        return new Promise((resolve,reject)=>{
            let sql= `select b.b_id,c.c_name,b.b_name,b.b_logo,b.b_desc,b.b_story,
            DATE_FORMAT(b.create_time,'%Y-%m-%d') AS b_create_time,b.state
            from brand as b left join company as c
            on b.c_id=c.c_id
            where b.state=1 limit ?,? `;
            db.pool.query(sql,params,(err,data)=>{
                resolve(data);
                //console.log(data);
            })
        })
    } ,
    /**
     * 2. getPage ,总共有多少页
     * */
        getPage(){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT COUNT(*) as a FROM brand where state=1 `;
            db.pool.query(sql,[],(err,data)=>{
                resolve(data);
            })
        })
    },
    /**
     * 3. getAllBrand,拿到所有品牌信息
     * */
    getAllBrand(){
        return new Promise((resolve,reject)=>{
            let sql=`select * from brand where state=1`;
            db.pool.query(sql,(err,data)=>{
                //console.log(data);
                resolve(data);
            })
        })
    },
    delete(id){
        return new Promise((resolve,reject)=>{
            let sql=`update brand set state=0 where b_id=? `;
            db.pool.query(sql,id,(err,data)=>{
                //console.log(data);
                resolve(data);
            })
        });
    },
    /**
     * 4. add ,增加品牌信息
     * */
     add(brandCom,addName,brandImg,storyAddDesc,branStory,comDate){
        return new Promise((resolve,reject)=>{
            let sql=`insert into brand values (null,?,?,?,?,?,?,1)`;
            db.pool.query(sql,[brandCom,addName,brandImg,storyAddDesc,branStory,comDate],(err,data)=>{
                resolve(data);
            });
        })
    },
    /**
     * 5. search ,查询品牌信息
     * */
     search(company,name){
        "use strict";
        return new Promise((resolve,reject)=>{
            let sql=`select b.b_id,c.c_name,b.b_name,b.b_logo,b.b_desc,b.b_story,
            DATE_FORMAT(b.create_time,'%Y-%m-%d') AS b_create_time,b.state
            from brand as b left join company as c
            on b.c_id=c.c_id
            where b.state=1`;
            var arr=[];
            if(company!=0){
                sql +=' and b.c_id=?';
                arr.push(company);
            }
            if(name!=0){
                sql +=' and b.b_id=?';
                arr.push(name);
            }
            sql+=" limit 0,5";
            //console.log(arr);
            db.pool.query(sql,arr,(err,data)=>{
                //console.log(data);
                resolve(data);
            });
        })
    },
    /**
     * 6. update ,修改品牌信息
     * */
     update(name,ssImg,storyUpdateDesc,storyTitle,storyTime,id){
        "use strict";
        return new Promise((resolve,reject)=>{
            let sql="update brand set b_name=?,b_logo=?,b_desc=?,b_story=?,create_time=? where b_id=?";
            //console.log(name);
            db.pool.query(sql,[name,ssImg,storyUpdateDesc,storyTitle,storyTime,id],(err,data)=>{
                //console.log(err);
                resolve(data);
            });
        })
    },
    /**
     * 8. list ,根据ID查询对应的信息
     * */
     list(id){
        return new Promise((resolve,reject)=>{
            let sql=`select * from brand where b_id=? `;
            db.pool.query(sql,id,(err,data)=>{
                //console.log(data);
                resolve(data);
            })
        });
    },
    /**
     * 9. brandlist ,查询对应的信息
     * */
    brandlist(){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT * from brand `;
            db.pool.query(sql,(err,data)=>{
                //console.log(data);
                resolve(data);
            })
        });
    }

};
