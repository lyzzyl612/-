/**
 * Created by hpp on 2017/11/23.
 */
"use strict";
const db=require("./sqlPool.js");

module.exports= {
    /**
     * 1. allMeg ,一页显示几条数据
     * */
        allMeg(params){
        return new Promise((resolve, reject)=> {
            let sql = `select f_id,f_Keywords,f_img,f_title,f_artical,f_index,DATE_FORMAT(f_time,'%Y-%m-%d') as f_time
                     from fashion where f_state=1 limit ?,? `;
            db.pool.query(sql, params, (err, data)=> {
                resolve(data);
                //console.log(data);
            })
        })
    },
    /**
     * 2. getPage ,总共有多少页
     * */
        getPage(){
        return new Promise((resolve, reject)=> {
            let sql = `SELECT COUNT(*) as a FROM fashion where f_state=1 `;
            db.pool.query(sql, [], (err, data)=> {
                resolve(data);
            })
        })
    },
    /**
     * 2. getPage ,总共有多少页
     * */
     search(Keywords,articleName){
        "use strict";
        return new Promise((resolve, reject)=> {
            let sql = `select f_id,f_Keywords,f_img,f_title,f_artical,f_index,
            DATE_FORMAT(f_time,'%Y-%m-%d') AS f_time
            from fashion
            where f_state=1`;
            var arr = [];
            Keywords="%"+Keywords+"%";
            if (Keywords) {
                sql += ' and f_Keywords like ?';
                arr.push(Keywords);
            }
            articleName="%"+articleName+"%";
            if (articleName != 0) {
                sql += ' and f_title like ?';
                arr.push(articleName);
            }
            sql += " limit 0,3";
            //console.log(sql);
            db.pool.query(sql,arr,(err, data)=> {
                //console.log(data);
                resolve(data);
            });
        })
    },
    /**
     * 3. list ,总共有多少页
     * */
    list(){
        "use strict";
        return new Promise((resolve, reject)=>{
            let sql=`select * from fashion`;
            db.pool.query(sql,(err, data)=> {
                //console.log(data);
                resolve(data);
            });
        })
    },
    /**
     * 4. delete ,切换状态
     * */
    del(state,id){
        "use strict";
        return new Promise((resolve, reject)=>{
            let sql=`update fashion set f_index=? where f_id=?`;
            console.log(state);
            console.log(id);
            db.pool.query(sql,[state,id],(err,data)=> {
                console.log(data);
                resolve(data);
            });
        })
    },
    /**
     * 4.1 deleteTile ,删除文章数据
     * */
    deleteTile(id){
        "use strict";
        return new Promise((resolve, reject)=>{
            let sql=`update fashion set f_artical=null where f_id=?`;
            db.pool.query(sql,[id],(err,data)=> {
                //console.log(data);
                resolve(data);
            });
        })
    },
    /**
     * 5. update ,删除数据
     * */
    update(keyTit,fashionTit,img,id){
        "use strict";
        return new Promise((resolve,reject)=>{
            let sql="update fashion set f_Keywords=?,f_title=?,f_img=? where f_id=?";
            db.pool.query(sql,[keyTit,fashionTit,img,id],(err,data)=>{
                resolve(data);
            });
        })
    },
    /**
     * 6. listFashion ,根据ID查所有的信息
     * */
    listFashion(id){
        "use strict";
        return new Promise((resolve,reject)=>{
            let sql="select * from fashion where f_id=?";
            //console.log(name);
            db.pool.query(sql,id,(err,data)=>{
                resolve(data);
            });
        })
    },
    /**
     * 7. add ,增加品牌信息
     * */
     add(fashionName,storyAddImg,fashionTil,editorContent){
        return new Promise((resolve,reject)=>{
            let sql=`insert into fashion values (null,?,?,?,?,1,now(),1)`;
            db.pool.query(sql,[fashionName,storyAddImg,fashionTil,editorContent],(err,data)=>{
                resolve(data);
            });
        })
    },
    /**
     * 7.1 updateTitle ,修改文章保存
     * */
    updateTitle(f_artical,id){
        return new Promise((resolve,reject)=>{
            let sql=`update fashion set f_artical=? where f_id=?; `;
            db.pool.query(sql,[f_artical,id],(err,data)=>{
                resolve(data);
            });
        })
    },
    addTitle(ff,id){
        return new Promise((resolve,reject)=>{
            let sql=`update fashion set f_artical=? where f_id=?; `;
            db.pool.query(sql,[ff,id],(err,data)=>{
                resolve(data);
            });
        })
    }

};