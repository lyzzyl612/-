/**
 * Created by xyy on 2017/10/31.
 */
"use strict";
var currentPage=1;
var pageSize=5;
var totalPage;
//加载页面的ajax
function load(){
    var o_state=$("#o_state").val();
    var o_under = $("#o_under").val();
    var o_dep = $("#o_dep").val();
    var selName = $("#selName").val();
    var selLog = $("#selLog").val();


    var param = "pageSize="+pageSize+"&currentPage="+currentPage+"&o_state="+o_state+"&o_under="+o_under+"&o_dep="+o_dep+"&selName="+selName+"&selLog="+selLog;
    console.log(param);
    $.get("/order/list.do",param,function(data){
        //响应成功

        $("#tableList").html("");
        var obj = data;//字符串转换成json对象

        for(var i =0; i<obj.length; i++){
            var o_underline;
            var o_deposit;
            var o_state;
            var go_return;
            if(obj[i].o_underline==1){
                o_underline="线下"
            }else{
                o_underline="线上"
            }
            if(obj[i].o_deposit==1){
                o_deposit="是"
            }else{
                o_deposit="否"
            }
            var color1;
            var color2;
            if(obj[i].o_state==1){
                o_state="未支付";
                color1="label ";
                color2="label-warning";
            }else if(obj[i].o_state==2){
                o_state="已支付";
                color1="label ";
                color2="label-info";
            }else if(obj[i].o_state==3){
                o_state="已完成";
                color1="label ";
                color2="label-success";
            }else if(obj[i].o_state==4){
                o_state="已取消";
                color1="label ";
                color2="label-danger";
            }

            if(obj[i].go_return==0){
                go_return="未申请"
            }if(obj[i].go_return==1){
                go_return="申请中"
            }if(obj[i].go_return==2){
                go_return="申请成功"
            }if(obj[i].go_return==3){
                go_return="申请失败"
            }
            $("#tableList").append(
                '<tr><td>'+obj[i].a_receiver+'</td>'+
                '<td>'+obj[i].a_phone+'</td>'+
                '<td>'+obj[i].a_province+obj[i].a_city+obj[i].a_region+obj[i].a_details+'</td>'+

                '<td>'+obj[i].o_amount+'</td>'+



                '<td>'+obj[i].go_create_time+'</td>'+
                '<td>'+obj[i].o_logistNum+'</td>'+
                '<td>'+o_underline+'</td>'+
                '<td>'+o_deposit+'</td>'+
                '<td><span class="'+color1+color2+'">'+o_state+'</span></td>'+
                '<td>'+obj[i].booking_day+'-'+obj[i].booking_time+'</td>'+
                '<td>'+obj[i].booking_remark+'</td>'+
                '<td>' +
                '<span type="button" title="修改" rid="'+obj[i].o_u_id+'"  style="cursor: pointer" onclick="orderUpdate(this)" class="fa fa-edit"></span>' +
                '<span class="label label-success radius" data-toggle="modal" style="cursor: pointer"  data-target="#myModal" rid="'+obj[i].o_u_id+'"  onclick="orderSearch(this)">详情</span>'+
                '</td></tr>'
            )
        }
    },"json");
}

$(document).ready(function(){
    //load();
    count();
});
//点击删除找到当前id
var delid;
function staffDel(obj){
    $("#delStaff").modal("show");
    delid = $(obj).attr("rid");

}

////点击确认删除数据库的值
$("#btnDel").click(function(){
    var param ="id="+delid;
    $.post("/staff/delete.do",param,function(data){
        console.log(data);
        if(data == "删除成功"){
            load();
            $("#delStaff").modal("hide");
        }
    });
});

//点击修改获取数据库的值
var moId;
function orderUpdate(obj){
    $("#modifyOrder").modal("show");
    moId = $(obj).attr("rid");
    var param = "id="+ moId;
    $.post("/order/select.do",param,function(data){
        var obj = data;
        console.log(obj);
        $("#o_amount").val(obj[0].o_amount);
        $("#o_underline").val(obj[0].o_underline);
        $("#o_deposit").val(obj[0].o_deposit);
        $("#o_stateo").val(obj[0].o_state);
        $("#a_province").val(obj[0].a_province);
        $("#a_city").val(obj[0].a_city);
        $("#a_region").val(obj[0].a_region);
        $("#a_details").val(obj[0].a_details);
    },"json");
}

////点击确认修改修改数据库的值
$("#btnUpdate").click(function(){
    var o_amount=$("#o_amount").val();
    var o_underline=$("#o_underline").val();
    var o_deposit=$("#o_deposit").val();
    var o_stateo=$("#o_stateo").val();
    var a_province=$("#a_province").val();
    var a_city=$("#a_city").val();
    var a_region=$("#a_region").val();
    var a_details=$("#a_details").val();
    var param = "o_amount="+ o_amount+"&o_underline="+ o_underline+"&o_deposit="+ o_deposit+"&o_state="+o_stateo+"&a_province="+ a_province+"&a_city="+a_city+"&a_region="+a_region+"&a_details="+a_details+"&orderId="+ moId;
    console.log(param);
    $.post("/order/update.do",param,function(data){
        if(data == "修改成功"){
            load();
        }
    });
});
//查看详情获取数据库的值
function orderSearch(obj){
    $("#detailsOrder").modal("show");
    moId = $(obj).attr("rid");

    var param = "id="+ moId;
    console.log(param);
    $.post("/order/select.do",param,function(data){
        $("#detailsOrder_table").html("");
        var obj = data;

        console.log(obj);
        for(var i =0; i<obj.length; i++){
            var g_sex;
            var g_type;
            if(obj[i].g_sex==1){
                g_sex="男"
            }else{
                g_sex="女"
            }
            if(obj[i].g_type==1){
                g_type="镜框"
            }else{
                g_type="太阳镜"
            }

            $("#detailsOrder_table").append(
                '<thead>'+
                '<tr>'+
                '<th colspan="2">宝贝</th>'+
                '<th>宝贝属性</th>'+
                '<th>单价</th>'+
                '<th>数量</th>'+
                '<th>商品总价</th>'+
                '</tr>'+
                '</head>'+
                '<tbody>'+
                '<tr><td><img src="'+obj[i].g_src+'" alt="" style=" width:80px;"></td>' +
                '<td>'+obj[i].g_name+'</td>' +
                '<td>'+g_sex+'<br>'+g_type+'</td>' +
                '<td>'+obj[i].g_saleprice+'</td>' +
                '<td>'+obj[i].go_count+'</td>' +
                '<td>'+obj[i].o_amount+'</td>' +
                '</tr>'+
                '</tbody>'

            )
        }

    },"json");
}

//获取总条数
function count(){
    $.post("/order/totalRow.do",null,function(data){
        var jsonObj =data;
        totalPage = Math.ceil(jsonObj[0].num/pageSize);
        //console.log(jsonObj);
    },"json")
}
//向前翻页
$("#btnPrev").click(function(){
    currentPage--;
    if(currentPage==0){
        currentPage=1
    }
    load();
});
//向后翻页
$("#btnNext").click(function(){

    if(currentPage==totalPage){
        currentPage=totalPage-1;
    }
    currentPage++;
    load();
});
//点击当前页改变页面
function changePage(i){
    currentPage = i;

    load();
}

$("#btnSearch").click(function(){
    load();
});
