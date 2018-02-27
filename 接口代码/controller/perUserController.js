/**
 * Created by Administrator on 2017/11/16.
 */
const userModal = require("../modal/perUserModal.js");

function userSave(req, res) {
    let sex = req.body.sex;
    if (sex == "女") {
        sex = 0;
    } else {
        sex = 0;
    }
    let bir = req.body.bir;
    let email = req.body.email;
    let qq = req.body.qq;
    qq = parseInt(qq);
    let id = req.body.uid;
    id = parseInt(id);

    userModal.saveUser(sex, bir, email, qq, id).then(function (data) {
        res.send({code: 200, data: data});
        console.log(data);
    }).catch(function (err) {
        console.log(err);
        res.send({code: 500});
    });
}
//显示  clz  改
function userList(req,res){
    let userId=req.body.userId;
    userModal.list(userId).then(function(data){
        res.send({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}

function region(req,res){
    let regUname=req.body.regUname;
    let regPwd=req.body.regPwd;
    let regPhone=req.body.regPhone;
    //console.log(regUname);
    //console.log(regPwd);
    //console.log(regPhone);
    userModal.region(regUname, regPwd, regPhone).then(function (data) {
        res.send({code: 200, data: data});
        //console.log(data);
    }).catch(function (err) {
        console.log(err);
        res.send({code: 500});
    });
}

function orderList(req, res) {
    userModal.orderList().then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
}
//修改登录密码
function LpwdChange(req, res) {
    let oldLpwd = req.body.oldLpwd;
    let newLpwd = req.body.newLpwd;
    let sureLpwd = req.body.sureLpwd;
    let list;
    userModal.validOldLpwd(oldLpwd).then(function (data) {
        //res.send(data);
        list = data
    }).then(function () {
        //console.log(list);
        if (!(list[0])) {
            console.log("密码错误");
            res.send({code:400})
        } else {
            if (newLpwd == sureLpwd) {
                let pwd = list[0].u_pwd;
                userModal.updateLpwd(newLpwd).then(function (data) {
                    res.send({code:200})
                })
            } else {
                res.send({code:500});
                console.log("两次输入的密码不一样，请重新输入")
            }
        }
    }).catch(function (err) {
            console.log(err)
        })
}

//修改支付密码
function PpwdChange(req, res) {
    let oldPpwd = req.body.oldPpwd;
    let newPpwd = req.body.newPpwd;
    let surePpwd = req.body.surePpwd;
    let list;
    userModal.validOldPpwd(oldPpwd).then(function (data) {
        list = data
    }).then(function () {
        console.log(list);
        if (!(list[0])) {
            res.send({code:400});
            console.log("支付密码错误")
        } else {
            if (newPpwd == surePpwd) {
                let pwd = list[0].u_pwd;
                userModal.updatePpwd(newPpwd).then(function (data) {
                    res.send({code:200})
                })
            } else {
                res.send({code:500});
                console.log("两次输入的支付密码不一样，请重新输入")
            }
        }
    }).catch(function (err) {
        console.log(err)
    })
}
//修改绑定邮箱
function emailChange(req, res) {
    let email=req.body.email;
    userModal.emailChange(email).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
}

//修改手机
function updatePhone(req, res) {
    let txtPhone=req.body.txtPhone;
    let userId=req.body.userId;
    userModal.updatePhone(txtPhone,userId).then(function (data) {
        res.send(data)
    }).catch(function (err) {
        console.log(err)
    })
}

module.exports = {
    userSave,
    userList,
    orderList,
    LpwdChange,
    PpwdChange,
    emailChange,
    region,
    updatePhone
};