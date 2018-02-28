/**
 * Created by zy on 2017/11/19.
 */
"use strict";

function dictionary(){
    $.post("/goods/dictionary.do",null,function(data){
        //console.log(data);
        //let obj = JSON.parse(data);
        console.log(data);
        var gStyle = data.gstyle;
        var gMaterial = data.gmaterial;
        var gframe = data.gframe;
        var gcolor = data.gcolor;

        for(let i=0;i<gStyle.length;i++){
            //console.log($("#astyle"))
            $("#astyle").append(`
                <option value="${gStyle[i].dict_id}">${gStyle[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gMaterial.length;i++){
            $("#amaterial").append(`
                <option value="${gMaterial[i].dict_id}">${gMaterial[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gframe.length;i++){
            $("#aframe").append(`
                <option value="${gframe[i].dict_id}">${gframe[i].dictdata_name}</option>
            `)
        }
        for(let i=0;i<gcolor.length;i++){
            $("#checkColor").append(`
            <div class="input-group goodsAddColor">
                <label  class="form-label" for="upcolor1" >${gcolor[i].dictdata_name}</label>
                <input type="checkbox" class=" upcolor" value="${gcolor[i].dict_id}"/>
                </div>
            `)
        }

    },"json")
}
function relode(){
    $.post("/goods/listBrand.do",null,function(data){
        //let obj = JSON.parse(data);
        console.log(data);
        for(var i=0;i< data.length;i++){
            $("#abrandName").append(
                `<option value="${data[i].b_id}">${data[i].b_name}</option>`
            )
        }
    },"json")
}
//页面加载
$(function(){
    relode();
    dictionary();
});

$("#gasave").click(function(){
    var agoodsName = $("#agoodsName").val();
    var abrandName = $("#abrandName").val();
    var minimg = $("#imgimg").attr("src");
    var asex = $("#asex").val();
    var abid = $("#abid").val();
    var asale = $("#asale").val();
    var apromotion = $("#apromotion").val();
    var aweight = $("#aweight").val();
    var aouter = $("#aouter").val();
    var awidth = $("#awidth").val();
    var aleg = $("#aleg").val();
    var ainner = $("#ainner").val();
    var aheight = $("#aheight").val();
    var aunderline = $("#aunderline").val();
    var acount = $("#acount").val();
    var atype = $("#atype").val();
    var astyle = $("#astyle").val();
    var amaterial = $("#amaterial").val();
    var aframe = $("#aframe").val();
    var acolor=",";
    for(let j=0;j< $("input:checked").length;j++) {
        acolor +=$("input:checked")[j].value+",";
    }
    //console.log(minimg)
    var param = "abrandName="+ abrandName+"&minimg="+ minimg+"&agoodsName="+ agoodsName+"&asex="+ asex+"&abid="+abid
        +"&asale="+ asale+"&apromotion="+ apromotion+"&aweight="+ aweight+"&aouter="+ aouter
        +"&awidth="+ awidth+"&aleg="+ aleg+"&ainner="+ ainner+"&aheight="+ aheight+"&aunderline="+ aunderline
        +"&acount="+ acount+"&atype="+ atype +"&astyle="+ astyle+"&amaterial="+ amaterial
        +"&aframe="+ aframe+"&acolor="+ acolor;
    //console.log(param);
    $.post("/goods/add.do",param,function(data){
        var obj=data.code;
        console.log(obj);
        if(obj == 200){
            window.location="goodsList.html";
        }

    },"json");
});


$("#minimg").change(function(){
    //console.log(1211)
    let form =document.getElementById("goodsAddForm");
    let formData = new FormData(form);
    console.log(formData);
    ajax("post","/goodsImgUpload.do",formData, function (data) {
        console.log(data);
        $("#imgimg")[0].src=data;
    })
});
