/**
 * Created by Administrator on 2017/11/14.
 */
const pool = require("./dbHelp.js");
//1.获取品牌信息
function listBrand() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM brand";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })

    })
}
//2.获取边框信息
function frame() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM dictionary WHERE dict_value='边框'";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//3.获取材质信息
function material() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM dictionary WHERE dict_value='材质'";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//4.获取风格信息
function style() {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM dictionary WHERE dict_value='风格'";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//5.获取眼镜的数据
function glasses(){
    return new Promise(function (resolve, reject) {
        var sql="SELECT * FROM goods";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}
//获取颜色信息
function color(){
    return new Promise(function (resolve, reject) {
        var sql="SELECT * FROM dictionary WHERE dict_value='颜色'";
        pool.query(sql,[])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//===============================================================================
//点击“选好了去试戴” 获取眼镜数据
function tryOn(id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM goods WHERE 1=1 AND g_id IN "+'('+id+')';
        pool.query(sql,id)
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            console.log(err);
            reject(err)
        })
    })
}


//===========================================================================
//获取所选眼镜的品牌图片
function chooseShowPhoto(id) {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT bi.brand_src FROM goods AS g
JOIN brand AS b ON g.b_id=b.b_id
LEFT JOIN brand_img AS bi ON g.b_id=bi.b_id
WHERE g.g_id=?`;
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })

    })
}
//获取所选眼镜的品牌故事
function chooseBrandMessage(id) {
    return new Promise(function (resolve, reject) {
        let sql = `SELECT s_describe,b_story,s_production FROM goods
JOIN brand ON goods.b_id=brand.b_id
JOIN story ON goods.b_id=story.b_id
WHERE goods.g_id=?`;
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })

    })
}

//获取所选眼镜的颜色种类有哪些
function chooseBrandColors(id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT g.g_color,(SELECT GROUP_CONCAT(d.dictdata_name)FROM dictionary AS d WHERE  LOCATE(CONCAT(',',d.dict_id,','), g.g_color)>0) AS g_color FROM goods AS g WHERE g.g_id=?";
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//获取所选眼镜的图片
function chooseImgthumb(id){
    return new Promise(function (resolve, reject) {
        let sql = "SELECT g_src FROM goods WHERE g_id=?";
        pool.query(sql,[id])
            .then(function (data) {
                resolve(data)
            }).catch(function (err) {
            reject(err)
        })
    })
}

//=============筛选============================================================
//试戴筛选
function screen(brand,sex,style,material,frame,type){
    return new Promise(function(resolve,reject){
        let sql="SELECT * FROM goods AS g LEFT JOIN brand AS b ON g.b_id=b.b_id LEFT JOIN dictionary AS d ON g.g_material=d.dict_id LEFT JOIN dictionary AS d2 ON g.g_style=d2.dict_id LEFT JOIN dictionary AS d3 ON g.g_frame=d3.dict_id where 1=1 ";
        var arr=[];
        if (brand){
            brand='%'+brand+'%';
            sql+="and b.b_id like ? ";
            arr.push(brand)
        }
        if (sex){
            sex='%'+sex+'%';
            sql+="and g_sex like ? ";
            arr.push(sex)
        }
        if (style){
            style='%'+style+'%';
            sql+="and d2.dict_id like ? ";
            arr.push(style)
        }
        if (material){
            material='%'+material+'%';
            sql+="and d.dict_id like ? ";
            arr.push(material)
        }
        if (frame){
            frame='%'+frame+'%';
            sql+="and d3.dict_id like ? ";
            arr.push(frame)
        }
        if (type){
            type='%'+type+'type';
            sql+="and g.g_type like ? ";
            arr.push(type)
        }
        pool.query(sql,arr).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err);
            console.log(err)
        })
    })
}
//=============================试戴预览==================
//试戴对比
function tryComparing(){
    return new Promise(function(resolve,reject){
        let sql="";
        pool.query(sql,[]).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err);
            console.log(err)
        })
    })
}


//保存试戴效果
function TryItEffect(targetPath){
    return new Promise(function(resolve,reject){
        let sql="INSERT INTO online_wear VALUES (NULL,null,null,?,NOW(),NULL)";
        pool.query(sql,[targetPath]).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err);
            console.log(err)
        })
    })
}





module.exports = {
    listBrand,
    glasses,
    tryOn,
    chooseShowPhoto,
    chooseBrandMessage,
    chooseBrandColors,
    chooseImgthumb,
    screen,
    frame,
    material,
    style,
    TryItEffect,
    color
};