/**
 * Created by zy on 2017/11/17.
 */

var currentPage=1;//当前页
var pageSize=5;//每页条数
var totalPage;//总页数
var totalCount;//总条数

"use strict";
//加载页面的ajax
function load(){
    var goodsName = $("#goodsName").val();
    var brand = $("#brand").val();
    var sex = $("#sex").val();
    var underline = $("#underline").val();
    var state = $("#state").val();
    var param = "goodsName="+goodsName+"&brand="+brand+"&sex="+sex+"&underline="+underline+"&state="+state
        +"&currentPage="+currentPage+"&pageSize="+pageSize;
    $.get("/goods/listAjax.do",param,function(data){
        console.log(data);
        $("#tableList").html("");
        var obj = data;

        for(var i =0; i<obj.length; i++){
            var state,underline,sex;
            if(obj[i].state==1){
                state=`<span class="label label-success radius">已发布</span>`
            }else{
                state=`<span class="label label-default radius">已下架</span>`
            }
            if(obj[i].g_underline==1){
                underline="是"
            }else{
                underline="否"
            }
            if(obj[i].g_sex==1){
                sex="男款"
            }else{
                sex="女款"
            }
            $("#tableList").append(`<tr>
                <td><input type="checkbox"/></td>
                <td>${obj[i].g_id}</td>
                <td>${obj[i].g_name}</td>
                <td><img style="width: 80px;height: 50px;" src="${obj[i].g_src}" alt=""/></td>
                <td>${obj[i].b_name}</td>
                <td>${obj[i].g_bid}</td>
                <td>${obj[i].g_saleprice}</td>
                <td>${obj[i].g_stock}</td>
                <td>${underline}</td>
                <td>${sex}</td>
                <td>${obj[i].style}</td>
                <td>${obj[i].material}</td>
                <td>${obj[i].frame}</td>
                <td>${obj[i].color}</td>
                <td>${state}</td>
                <td>
                <span class="label label-success radius" style="cursor: pointer;" onclick="details(this)" gid="${obj[i].g_id}"  data-toggle='modal'
                              data-target='#goodsDetails'>详情</span>
                <span class='fa fa-edit crewModify' style="cursor: pointer;" onclick="goodsModify(this)" title="修改"  gid="${obj[i].g_id}"  data-toggle='modal'
                              data-target='#myModal'></span>
                    <span class='fa fa-refresh changeState' style="cursor: pointer;" gid="${obj[i].g_id}" title="切换状态" state="${obj[i].state}"></span>

                </td>
            </tr>`)
        }
    },"json")
}
function dictionary(){
    $.post("/goods/dictionary.do",null,function(data){
        let obj = data;
        console.log("111111111")
        console.log(obj);
        var gStyle = obj.gstyle;
        var gMaterial = obj.gmaterial;
        var gframe = obj.gframe;
        var gcolor = obj.gcolor;

        for(let i=0;i<gStyle.length;i++){
            console.log($("#upstyle"))
            $("#upstyle").append(`
                <option value="${gStyle[i].dict_id}">${gStyle[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gMaterial.length;i++){
            $("#upmaterial").append(`
                <option value="${gMaterial[i].dict_id}">${gMaterial[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gframe.length;i++){
            $("#upframe").append(`
                <option value="${gframe[i].dict_id}">${gframe[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gcolor.length;i++){
            $("#checkColor").append(`
                <label  class="form-label col-xs-1 col-sm-1" for="upcolor1" >${gcolor[i].dictdata_name}</label>
                <input type="checkbox" class="form-control col-xs-1 col-sm-1 upcolor" value="${gcolor[i].dict_id}"/>
            `)
        }

    },"json")
}
//页面加载
$(function(){
    count();
    dictionary();
});
//添加风格
$(".addDict").on("click",function(){
    $("#dict_name").val("")
    let dict = $(this).attr("dict_value");
    $(".addDic").html(dict)
    $("#addAdict").modal()
    //$(ajax(""))
});
$("#addDicSave").click(function(){
    let dict_value =  $(".addDic").html()
    let dict_name = $("#dict_name").val()
    let param = "dict_value="+dict_value+"&dict_name="+dict_name;
    $.post("/goods/addDict.do",param,function(data){
        let obj = data
        if(obj.code==200){
            $("#addAdict").modal("hide")
        }
    },"json")
})
//点击切换状态
$(document).on("click",".changeState",function(){
    let changeId = $(this).attr("gid");
    let state=$(this).attr("state");
    console.log(changeId);
    state=state==0?1:0;
    var param = "id="+ changeId+"&state="+ state;
    $.post("/goods/delete.do",param,function(data){
      //console.log(data)
        let obj = data.code;
        if(obj==200){
            load();
        }
    },"json")
});

//获取总条数
function count(){
    var goodsName = $("#goodsName").val();
    var brand = $("#brand").val();
    var sex = $("#sex").val();
    var underline = $("#underline").val();
    var state = $("#state").val();
    var param = "goodsName="+goodsName+"&brand="+brand+"&sex="+sex+
        "&underline="+underline+"&state="+state+"&currentPage="+currentPage+"&pageSize="+pageSize;
    $.post("/goods/totalRow.do",param,function(data){
        $("#changePage").html("");
        //var jsonObj = JSON.parse(data);
        var jsonObj = data;
        totalCount = jsonObj[0].num;
        totalPage = Math.ceil(jsonObj[0].num/pageSize);
        //console.log("total"+totalPage);
        //console.log(jsonObj);
        for(var i=1;i<=totalPage;i++){
            $("#changePage").append(`
            <a onclick="changePage(${i})" href="javascript:">${i}</a>
            `)
        }
        $("#totalCount").html(totalCount);
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
    //console.log("currentPage"+currentPage);
    //console.log("totalPage"+totalPage);
    load();
});
//点击当前页改变页面
function changePage(i){
    currentPage = i;
    load();
}
//查询
$("#btnSearch").click(function(){
    currentPage = 1;
    load();
    count();
});


//点击修改获取数据库的值
var moId,detaId;
function goodsModify(obj){
    //$("#modifyStaff").modal("show");
    if(obj){

        moId = $(obj).attr("gid");
        console.log(moId);
    }else{
        moId =  detaId;
        console.log(moId);
    }

    //console.log(moId)
    var param = "id="+ moId;
    $.post("/goods/select.do",param,function(data){
        //var obj = JSON.parse(data);
        var obj = data;
        //console.log(obj);
        let g_colr=obj[0].g_color;
        let upcolor = g_colr.split(",");

        //console.log(obj);
        $("#upImg").attr("src",obj[0].g_src);
        $("#upgoodsName").val(obj[0].g_name);
        $("#upBrand").val(obj[0].b_id);
        $("#upBid").val(obj[0].g_bid);
        $("#upSale").val(obj[0].g_saleprice);
        $("#upPromotion").val(obj[0].g_promotion);
        $("#upWeight").val(obj[0].g_weight);
        $("#upOuter").val(obj[0].g_outerWidth);
        $("#upWidth").val(obj[0].g_width);
        $("#upLeg").val(obj[0].g_length);
        $("#upInner").val(obj[0].g_innerWidth);
        $("#upHeight").val(obj[0].g_height);
        $("#upUnderline").val(obj[0].g_underline);
        $("#upStock").val(obj[0].g_stock);
        $("#uptype").val(obj[0].g_type);
        $("#upsex").val(obj[0].g_sex);
        $("#upstyle").val(obj[0].g_style);
        $("#upmaterial").val(obj[0].g_material);
        $("#upframe").val(obj[0].g_frame);

        for(let j=0;j< $(".upcolor").length;j++) {
            $(".upcolor")[j].checked = "";
        }
        //ckbox.checked=""
        for(let i=1;i<upcolor.length;i++){
            for(let j=0;j< $(".upcolor").length;j++){
                if($(".upcolor")[j].value==upcolor[i]){
                    $(".upcolor")[j].checked="checked";
                }
            }
        }

    },"json");
}

////点击确认修改修改数据库的值
$("#btnUpdate").click(function(){
    var upSrc = $("#upImg").attr("src");
    var upgoodsName = $("#upgoodsName").val();
    var upBrand = $("#upBrand").val();
    var upBid = $("#upBid").val();
    var upSale =$("#upSale").val();
    var upPromotion =$("#upPromotion").val();
    var upWeight =$("#upWeight").val();
    var upOuter =$("#upOuter").val();
    var upWidth =$("#upWidth").val();
    var upLeg =$("#upLeg").val();
    var upInner =$("#upInner").val();
    var upHeight =$("#upHeight").val();
    var upUnderline = $("#upUnderline").val();
    var upStock=$("#upStock").val();
    var uptype = $("#uptype").val();
    var upsex = $("#upsex").val();
    var upstyle = $("#upstyle").val();
    var upmaterial = $("#upmaterial").val();
    var upframe = $("#upframe").val();
    var upcolor=",";
    for(let j=0;j< $("input:checked").length;j++) {
        upcolor +=$("input:checked")[j].value+",";
    }
    console.log(upcolor)
    var param = "&upgoodsName="+ upgoodsName+"&upBrand="+ upBrand+"&upBid="+ upBid+"&upWeight="+upWeight
        +"&upUnderline="+ upUnderline+"&upsex="+ upsex+"&upstyle="+ upstyle+"&upmaterial="+ upmaterial
        +"&upframe="+ upframe+"&upcolor="+ upcolor+"&upid="+ moId+"&upSrc="+ upSrc
        +"&upSale="+ upSale+"&upPromotion="+ upPromotion+"&upOuter="+ upOuter+"&upWidth="+ upWidth
        +"&upLeg="+ upLeg+"&upInner="+ upInner+"&upHeight="+ upHeight+"&upStock="+ upStock+"&uptype="+ uptype;
    //console.log(param);
    $.post("/goods/update.do",param,function(data){
        var obj=data.code;
        //var obj=JSON.parse(data).code;
        console.log(obj);
        if(obj == 200){
            load();
        }
    },"json");
});

//点击查看详情获取数据库的值

function details(obj){
    detaId = $(obj).attr("gid");
    console.log(detaId);
    var param="detaId="+detaId;
    $.post("/goods/details.do",param,function(data){
        console.log(data);
        $("#dGoodsName").html(data[0].g_name);
        $("#minImg").attr("src",data[0].g_src);
        $("#dBrandName").html(data[0].b_name);
        $("#outerW").html(data[0].g_outerWidth);
        $("#width").html(data[0].g_width);
        $("#length").html(data[0].g_length);
        $("#innerW").html(data[0].g_innerWidth);
        $("#height").html(data[0].g_height);
        $("#weight").html(data[0].g_weight);
        $("#material").html(data[0].material);
        $("#frame").html(data[0].frame);
        $("#bid").html(data[0].g_bid);
        $("#saleprice").html(data[0].g_saleprice);
        $("#promotion").html(data[0].g_promotion);

    },"json")
};


$("#detailEdit").click(function(){
   $("#myModal").modal();
    goodsModify();
});

//点击上传
$("#moUpload").change(function(){
    let upform = document.getElementById("upForm");
    let formData = new FormData(upform);
    ajax("post","/goodsImgUpload.do",formData,function(data){
        console.log(data)
        $("#upImg")[0].src=data;
    })
});

