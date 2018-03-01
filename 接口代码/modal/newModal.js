/**
 * Created by Administrator on 2017/11/16.
 */

const pool = require("./dbHelp.js");

//获取明星秀场页面的数据
function starShowList() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM star left JOIN brand ON star.b_id=brand.b_id";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//获取品牌资讯数据
function brandNew(id) {
    return new Promise(function (resolve, reject) {
        //let sql = "SELECT * FROM brand RIGHT JOIN company ON brand.c_id=company.c_id where 1=1 ";
        let sql = "select * from brand as b right join story as s on b.b_id = s.b_id where 1=1 ";
        if (id){
            sql+="and b_id=?"
        }else {
            id=null
        }
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}


//获取时尚街拍数据
function StreetChic(id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM fashion WHERE 1=1 ";
        if (id){
            sql+="and b_id=?"
        }else {
            id=null
        }
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}


//首页潮流街拍照片墙获取时尚街拍图片
function indexFashion() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM fashion WHERE f_index=1; ";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
                reject(err)
            })
    })
}
//获取品牌故事数据
function brandStory(id) {
    return new Promise(function (resolve, reject) {
        let sql = "select s_production from story where 1=1";
        if (id){
            sql+=" and b_id=?"
        }else {
            id=null
        }
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
                reject(err)
            })
    })
}



module.exports = {
    starShowList,
    brandNew,
    StreetChic,
    indexFashion,
    brandStory,
};