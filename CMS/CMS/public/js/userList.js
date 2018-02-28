/**
 * Created by caiyi on 2017/11/16.
 */


//设置全局变量id，获取点击icon时的对应id值
var id;
function getid(obj) {
    id = $(obj).parents("tr").attr("data-index");
    console.log(id)
}
//设置全局变量name，登录用户名
var name;

//设置全局变量，state
var state;
var pageSize = 5;   //每页条数
var currentPage = 1; //页数，从1开始
var totalPages;//  总页数
var total;    //总条数

//封装outHtml方法，局部加载tbody下数据
function outHtml(obj) {
    $("#t-body").html('');
    $.each(obj, function () {
    var color;
        if (this.state == 1) {
            state = "启用";
            color="danger"
        } else {
            state = "禁用";
            color="success"
        }
        if (this.u_sex == 1) {
            sex = "男";
        } else {
            sex = "女"
        }
        let birth = new Date(this.u_birth);
        birth = birth.getFullYear() + "-" + (birth.getMonth() + 1) + "-" + birth.getDate();
        let creat_time = new Date(this.create_time);
        creat_time = creat_time.getFullYear() + "-" + (creat_time.getMonth() + 1) + "-" + creat_time.getDate();
        var str = "";
        str += "<tr data-index=" + this.u_id + ">";
        str += "<td><input type='checkbox' value='1' name=''></td>" +
            "<td>" + this.u_id + "</td>" +
            "<td>" + this.u_name + "</td>" +
            "<td>" + sex + "</td>" +
            "<td>" + birth + "</td>" +
            "<td>" + this.u_phone + "</td>" +
            "<td>" + this.u_email + "</td>" +
            "<td>" + this.u_qq + "</td>" +
            "<td>" + creat_time + "</td>" +
            "<td><span  class='label label-"+color+"'>"+state+"</span></td>";
        str += "<td>" +
            "<span class='fa fa-edit' data-toggle='modal' onclick='getid(this)'  id='change-btn'  title='修改信息' data-target='#changedate'></span>" +
            "<span class='fa fa-refresh' data-toggle='modal' onclick='getid(this)' id='changeState' title='切换状态' state="+this.state+" u_id = "+this.u_id+" data-target='#del'></span>" +
//				"<span class='fa fa-key' data-toggle='modal' onclick='getid(this)' data-target='#delRole'></span>"+
            "</td>";
        str += "</tr>";
        $("#t-body").append(str);

    })
}
//listAjax方法加载页面数据

function listAjax() {
    //console.log(pageSize);
    var name = $("#username").val();
    var state = $("#state").val();
    var sex = $("#sex").val();
    $.post('user/listAjax.do', {"name": name, "state": state, "sex": sex,"pageSize":pageSize,"currentPage":currentPage}, function (data) {
        //console.log(data);
        var obj=data.list;
        name=data.name;
        //console.log(name);
        $("#pageNum").val(data.pagenum[0].number);
        outHtml(obj)
    }, "json")
}

//$().ready(function(){
//			listAjax()
//})


//修改信息
$("#change").click(function () {
    let name = $("#change-name").val();
    let sex = $("#change-sex").val();
    let birth = $("#change-birth").val();
    let phone = $("#change-phone").val();
    let email = $("#change-email").val();
    let QQ = $("#change-QQ").val();
    let state = $("#change-state").val();
    $.post('user/update.do', {
        "name": name,
        "sex": sex,
        "birth": birth,
        "phone": phone,
        "email": email,
        "QQ": QQ,
        "state": state,
        "id": id
    }, function (data) {
        listAjax()
    }, "json")
});

//修改禁用和启用状态
$(document).on("click", "#changeState", function () {
    let state = $(this).attr("state");
    let id = $(this).attr("u_id");
    //if(state=="0"){
    //    $(this).css("color:red")
    //}else{
    //    $(this).css("color:blue")
    //}
    $.post('user/changeState.do', {"state":state,"id": id}, function (data) {
        listAjax()
    }, "json");
});

//多条件查询
$("#search").click(function () {
    currentPage = 1;
    //console.log(currentPage);
    var name = $("#username").val();
    var state = $("#state").val();
    var sex = $("#sex").val();
    $.post("/user/search.do", {"name": name, "state": state, "sex": sex,"pageSize":pageSize,"currentPage":currentPage}, function (data) {
        //console.log(data.list);
        //console.log(data.pagenum[0].number);
        total=data.pagenum[0].number;
        totalPages = Math.ceil(total / pageSize);
        var obj=data.list;
        $("#autoPage").html('');
        for (var i = 1; i <= totalPages; i++) {
            $("#autoPage").append('<a onclick="turnPage(this)">' + i + '</a>')
        }
        $("#pageNum").val(data.pagenum[0].number);
        outHtml(obj);
    }, "json")
});

//点击修改按钮，获取该列数据的值，并显示在模态框内
$(document).on("click", "#change-btn", function () {
    $.post('user/getDate.do', {"id": id}, function (data) {
        //console.log(data);
        let birth = new Date(data[0].u_birth);
        birth = birth.getFullYear() + "-" + (birth.getMonth() + 1) + "-" + birth.getDate();
        birth = birth.toString();
        $("#change-name").val(data[0].u_name);
        $("#change-sex").val(data[0].u_sex);
        $("#change-birth").val(birth);
        $("#change-phone").val(data[0].u_phone);
        $("#change-email").val(data[0].u_email);
        $("#change-QQ").val(data[0].u_qq);
        $("#change-state").val(data[0].state);
    }, "json")
});

//分页
//页面载入时，获取最大页数以及自动添加页码

function listpage(){
    "use strict";
    $.post("/USER/listpage.do", null, function (data) {
        total = data[0].num;
        totalPages = Math.ceil(total / pageSize);
        for (var i = 1; i <= totalPages; i++) {
            $("#autoPage").append('<a onclick="turnPage(this)">' + i + '</a>')
        }
    }, "json");
}

$().ready(function(){
    "use strict";
    listpage()
});




//点击向前翻页
$("#pagePrev").click(function () {
    currentPage--;
    if (currentPage == 0) {
        currentPage = 1
    }
    listAjax()
});

//点击向后翻页
$("#pageNext").click(function () {
    currentPage++;
    if (currentPage > totalPages) {
        currentPage = totalPages
    }
    listAjax()
});

//函数：点击页码，跳转到对应页面trunPage()
function turnPage(obj) {
    currentPage = $(obj).text();
    listAjax()
}


//function changecolor(obj){
//    $("#open").removeClass("btn-primary");
//    $("#open").addClass("btn-danger");
//    console.log(obj)
//}

