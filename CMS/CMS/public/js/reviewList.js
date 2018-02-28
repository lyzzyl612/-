/**
 * Created by HT on 2017/11/20 0020.
 * 评论管理模块
 */
// "use strict";

//全局变量
let totalPage;//总页数
let totalItem;//数据总条数
let perPageItem = 5;//每页显示多少条
let nowPage = 1;//当前页

// 页面加载完成后遍历当前页评论数据
$(document).ready(list);
//页面加载完成后展示页码
$(document).ready(pagination);


//切换评论状态
$("#isTbody").on("click","#changeState",function () {
    let r_id = $(this).attr("stateId");
    let state = $(this).attr("state");
    let myUrl;

    if(state==1){
        myUrl = '/review/disable.do';
    }else if(state==0){
        myUrl = '/review/startUsing.do';
    }

    $.ajax({
        url: myUrl,
        dataType: 'text',
        type: 'post',
        data:{r_id:r_id},
        success: function (data, status, xhr) {
            if(data){
                list();
                console.log("状态切换成功！"+data);
            }else{
                console.log("状态切换失败！");
            }
        },
        error: function (xhr, status) {
            console.log("ajax请求失败"); console.log(xhr); console.log(status);
        }
    });
});


//删除评论，从数据库中删除（物理删除）
$("#isTbody").on("click", "#delete", function () {
    if (confirm("确定删除？")) {
        let r_id = $(this).attr("delId");
        $.ajax({
            url: '/review/delete.do',
            dataType: 'text',
            type: 'post',
            data: {r_id: r_id},
            success: function (data, status, xhr) {
                if (data) {
                    list();
                    alert("删除成功！")
                } else {
                    alert("删除失败！")
                }
            },
            error: function (xhr, status) {
                console.log("ajax请求失败");
                console.log(xhr);
                console.log(status);
            }
        });
    }
});


//批量禁用
$("#batchDis").on("click", function () {
    if (confirm("确定全部禁用？")) {
        $.each($(".isCheck"), function () {
            if (this.checked == true) {
                let batchDisId = $(this).attr("checkId");
                $.ajax({
                    url: '/review/batchDis.do',
                    dataType: 'text',
                    type: 'post',
                    data: {r_id: batchDisId},
                    success: function (data, status, xhr) {
                        if (data) {
                            list();
                            console.log("禁用成功");
                        } else {
                            alert("禁用失败");
                        }
                    }
                })
            }
        })
    }
    // list();
});

//批量启用
$("#batchStartUsing").on("click", function () {
    if (confirm("确定全部启用？")) {
        $.each($(".isCheck"), function () {
            if (this.checked == true) {
                let batchStartUsingId = $(this).attr("checkId");
                $.ajax({
                    url: '/review/batchStartUsing.do',
                    dataType: 'text',
                    type: 'post',
                    data: {r_id: batchStartUsingId},
                    success: function (data, status, xhr) {
                        if (data) {
                            list();
                            console.log("启用成功");
                        } else {
                            alert("启用失败");
                        }
                    }
                })
            }
        })
    }
});



//根据条件查询评论
$("#searchBtn").on("click",function () {
    //获取搜索框中的值
    let r_id = $("#search_r_id").val();
    let u_id = $("#search_u_id").val();
    let o_id = $("#search_o_id").val();
    let state = $("#search_state").val();
    //获取符合查询条件的数据条数
    sReqTotelItem(r_id,u_id,o_id,state);
    //获取符合查询条件的数据
    searchList(r_id,u_id,o_id,state,nowPage,perPageItem);
});

//发起获取符合查询条件的数据条数的ajax请求，获取页码列表
function sReqTotelItem(sRId,sUId,sOId,sState) {
    $.ajax({
        url: '/review/searchPagination.do',
        dataType: 'json',
        type: 'post',
        data: {r_id: sRId, u_id: sUId, o_id: sOId, state: sState},
        success: function (data) {
            totalItem = parseInt(data[0].totalItem);
            totalPage = Math.ceil(totalItem / perPageItem);
            $("#pageList").html('');
            for (let i = 1; i <= totalPage; i++) {
                $("#pageList").append("<a onclick='sPageListBtn(this)'>" + i + "</a>")
            }
        },
        error: function (xhr, status) {console.log("ajax请求失败");console.log(xhr);console.log(status);
        }
    });
}

//发起获取符合查询条件的数据的ajax请求
function searchList(sRId,sUId,sOId,sState,sNowPage,sPerPageItem) {
    $.ajax({
        url: '/review/search.do',
        dataType: 'json',
        type: 'post',
        data: {r_id: sRId, u_id: sUId, o_id: sOId, state: sState,nowPage:sNowPage,perPageItem:sPerPageItem},
        success: function (data) {
            tableLoop(data);
        },
        error: function (xhr, status) {console.log("ajax请求失败");console.log(xhr);console.log(status);
        }
    })
}

//查询结果中点击相应页码改变页面数据
function sPageListBtn(obj) {
    let r_id = $("#search_r_id").val();
    let u_id = $("#search_u_id").val();
    let o_id = $("#search_o_id").val();
    let state = $("#search_state").val();
    nowPage = $(obj).text();
    searchList(r_id,u_id,o_id,state,nowPage,perPageItem);
}



//根据传递的参数请求当前页的相应数据
//参数（nowPage：当前显示第几页，perPageItem:每页显示多少条数据）
function list() {
    $.ajax({
        url:"/review/list.do",
        dataType:"json",
        type:"post",
        data:{nowPage:nowPage,perPageItem:perPageItem},
        success:function (data) {
            tableLoop(data);
        },
        error: function (xhr, status) {
            console.log("ajax请求失败"); console.log(xhr); console.log(status);
        }
    });
}

//请求总的数据条数并显示页码列表
function pagination() {
    $.ajax({
        url:"/review/reqTotalItem.do",
        dataType:"json",
        type:"post",
        success:function (data) {
            totalItem = parseInt(data[0].totalItem);
            totalPage = Math.ceil(totalItem/perPageItem);
            $("#pageList").html('');
            for(let i=1;i<=totalPage;i++){
                $("#pageList").append("<a onclick='pageListBtn(this)'>"+i+"</a>")
            }
        },
        error: function (xhr, status) {
            console.log("ajax请求失败"); console.log(xhr); console.log(status);
        }
    });
}

//点击相应页码改变页面数据
function pageListBtn(obj) {
    nowPage = $(obj).text();
    list();
}



//将返回的数据遍历添加到页面表格中的方法
function tableLoop(jsonObject) {
    let stateStyle;
    $("#isTbody").html("");
    for (let i in jsonObject) {
        //将获取的状态码显示为对应启/禁用样式
        if(jsonObject[i].state==1){
            stateStyle="<span class='label label-success radius'>"+'已启用'+"<span/>";
        }else if(jsonObject[i].state==0){
            stateStyle="<span class='label label-danger radius'>"+'已禁用'+ "<span/>";
        }
        //将获取的日期格式转变为xxxx-xx-xx
        let birth = new Date(jsonObject[i].r_time);
        birth = birth.getFullYear() + "-" + (birth.getMonth() + 1) + "-" + birth.getDate();

        let str =
            "<tr>" +
                "<td><input checkId='"+jsonObject[i].r_id+"' type='checkbox' class='isCheck'></td>" +
                "<td>" + jsonObject[i].r_id + "</td>" +
                "<td>" + jsonObject[i].u_name + "</td>" +
                "<td>" + jsonObject[i].o_id + "</td>" +
                "<td>" + jsonObject[i].r_content + "</td>" +
                "<td>" + jsonObject[i].r_points + "</td>" +
                "<td>" + birth + "</td>" +
                "<td>" + stateStyle + "</td>" +
                "<td>" +
                    "<a delId='"+jsonObject[i].r_id+"' id='delete' class='fa fa-trash' title='删除'></a>"+
                    "<a stateId='"+jsonObject[i].r_id+"' state='"+jsonObject[i].state+"' id='changeState' class='fa fa-refresh' title='切换状态'></a>"+
                "</td>" +
            "</tr>";
        $("#isTbody").append(str);
    }
}