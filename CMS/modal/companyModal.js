/**
 * Created by hpp on 2017/11/17.
 */
/**
 * Created by hpp on 2017/11/15.
 * DAO层：数据层
 * 品牌所属公司相关
 */
"use strict";
const db=require("./sqlPool.js");

module.exports= {
    /**
     * 1. getAllCompany ,拿到所有公司信息
     * */
     getAllCompany(){
        return new Promise(function (resolve, reject) {
            let sql =`select c_id,c_name,c_address,c_contacts,c_contactsTel,c_tel,create_time,state
                 from company where state=1`;
            db.pool.query(sql,(err, data)=> {
                //console.log(data);
                resolve(data);
            })
        })
    },
    /**
     * 2. allMeg ,一页显示几条数据
     * */
     allMeg(params){
        return new Promise((resolve, reject)=> {
            let sql =`SELECT * FROM company where state=1 limit ?,?`
            db.pool.query(sql, params, (err, data)=> {
                resolve(data);
                //console.log(data);
            })
        })
    },
    /**
     * 3. getPage ,总共有多少页
     * */
     getPage(params){
        return new Promise((resolve, reject)=> {
            let sql=`SELECT COUNT(*) as a FROM company  where state=1 `;
            db.pool.query(sql, [], (err, data)=> {
                resolve(data);
            })
        })
    },
    /**
     * 4. delete ,删除
     * */
    delete(id){
        return new Promise((resolve, reject)=> {
            let sql=`update company set state=0 where c_id=?`;
            db.pool.query(sql,id,(err, data)=> {
                resolve(data);
            })
        });
    },
    /**
     * 5. add ,增加品牌信息
     * */
     add(compName,compAddress,compPeo,compPeoPhone,comPhone,comDate){
        return new Promise((resolve, reject)=> {
            let sql=`insert into company values (null,?,?,?,?,?,null,?,1)`;
            db.pool.query(sql,[compName,compAddress,compPeo,compPeoPhone,comPhone,comDate],(err, data)=> {
                resolve(data);
            })
        });
    },
    /**
     * 6. search ,查询品牌信息
     * */
     search(companyName,compPeople,peoplePhone,compPhone){
         return new Promise((resolve,reject)=>{
             let sql = `select c_id,c_name,c_address,c_contacts,c_contactsTel,c_tel,
                 DATE_FORMAT(create_time,'%Y-%m-%d') AS create_time,state
                 from company where state=1`;
             var arr = [];
             if (companyName != 0) {
                 sql += ' and c_id=?';
                 arr.push(companyName);
             }
             if (compPeople != 0) {
                 sql += ' and c_contacts=?';
                 arr.push(compPeople);
             }
             if (peoplePhone != 0) {
                 sql += ' and c_contactsTel=?';
                 arr.push(peoplePhone);
             }
             if (compPhone != 0) {
                 sql += ' and c_tel=?';
                 arr.push(compPhone);
             }
             sql += " limit 0,5";
             db.pool.query(sql,arr,(err,data)=>{
                 resolve(data);
             })
         });
    },
    /**
     * 7. update ,修改品牌信息
     * */
     update(comName, comAddress, comPeo,comPeoPhone, comPone,id){
        return new Promise((resolve,reject)=>{
            let sql=`update company set c_name=?,c_address=?,c_contacts=?,c_contactsTel=?,c_tel=? where c_id=?`;
            db.pool.query(sql,[comName, comAddress, comPeo,comPeoPhone, comPone,id],(err,data)=>{
                resolve(data);
            })
        });
    },
    /**
     * 8. list ,根据ID查询对应的信息
     * */
     list(id){
        return new Promise((resolve,reject)=>{
            let sql=`select * from company where c_id=? `;
            db.pool.query(sql,id,(err,data)=>{
                resolve(data);
            })
        });
    }
};
