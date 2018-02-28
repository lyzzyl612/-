/**
 * Created by hpp on 2017/11/23.
 */
//显示数据
var pageSize=3;//一页显示多少条
var currentPage;//当前页
var totalPage;//总页数
var total;//总条数
//富文本配置
var editor;
var editorContent;
KindEditor.ready(function(K) {
    editor = K.create('#txtContent', {
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImg.do',  //图片上传时向服务提交的地址
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',    'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
        height:'400px',
        width:'750px',
        afterUpload : function(url, data, name) { //上传文件后执行的回调函数，必须为3个参数
            if (name == "image") { //单个和批量上传图片时
                var img = new Image();
                img.src = url;
                img.onload = function () { //图片必须加载完成才能获取尺寸
                    if (img.width > 600) editor.html(editor.html().replace('<img src="' + url + '"', '<img src="' + url + '" width="600"'))
                }
            }
        }

     });
});
//富文本配置
var editor1;
KindEditor.ready(function(K) {
    editor1 = K.create('#addTxtContent', {
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImg.do',  //图片上传时向服务提交的地址
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',    'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'],

        height:'300px',
        width:'750px',
        afterUpload : function(url, data, name) { //上传文件后执行的回调函数，必须为3个参数
            if (name == "image" ) { //单个和批量上传图片时
                var img = new Image();
                img.src = url;
                img.onload = function () { //图片必须加载完成才能获取尺寸
                    if (img.width > 600) editor1.html(editor1.html().replace('<img src="' + url + '"', '<img src="' + url + '" width="600"'))
                }
            }
        }
    });
});
/*=======================查询=====================*/
$("#searchBtn").click(function(){
    list();
});
function list(){
    var Keywords=$("#Keywords").val();
    var articleName=$("#articleName").val();
    //console.log(name)
    var param="Keywords="+Keywords+"&articleName="+articleName;
    $.get("/fashionList/list.do",function(data){
        total=data.length;//总条数
    },"json");
    $.post("/fashionList/search.do",param,function(data){
        //console.log(data);
        var table=document.getElementById("tableList");
        table.innerHTML="";
        var state;
        for(var zz=0;zz<data.length;zz++){
            var aa=data[zz].f_index;
            //console.log(aa);
            if(aa==0){
                state="<span class='label label-default radius '>未发布</span>"
            }else{
                state="<span class='label label-success radius '>已发布</span>"
            }
            table.innerHTML+="" +
            "<tr class='text-c'>" +
            "<td><input type='checkbox' class='tableCheck'></td> " +
            "<td>"+data[zz].f_id+"</td> " +
            "<td>"+data[zz].f_Keywords+"</td> " +
            "<td class='fashionTitle' title='查看文章' sid="+data[zz].f_id+">"+data[zz].f_title+"</td> " +
            "<td><img src='"+data[zz].f_img+"' alt=''/></td> " +
            "<td>"+data[zz].f_time+"</td> " +
            "<td >"+state+"</td> " +
            "<td><span title='切换状态' class='del fa fa-refresh' state="+data[zz].f_index+"  sid="+data[zz].f_id+"></span > &nbsp; <span title='修改' class='upd fa fa-edit' sid="+data[zz].f_id+"></span></td> " +
            "</tr>";
        }
        currentPage=data.length;//查到的数据有多少条
        totalPage=Math.ceil(currentPage/pageSize);//查到后的页数1
        var ul= $("#myPage");
        ul.html("");
        if(Keywords==''&&articleName==''){
            $("#totalCount").html(total);//如果选择全部，则显示所有数据
            totalPage=Math.ceil(total/pageSize);//查到后的页数2
            ul.append("<li><a href="+(totalPage-1)+">&laquo;</a></li>");
            for(var k=1;k<=totalPage;k++){
                ul.append("<li><a href="+k+">"+k+"</a></li>");
            }
            ul.append("<li><a href="+totalPage+">&raquo;</a></li>");
        }else{
            $("#totalCount").html(currentPage);//如果选择查询，则显示相应数据
            if(totalPage-2<=0){
                totalPage=1;
                ul.append("<li><a href="+totalPage+">&laquo;</a></li>");
                for(var i=1;i<=totalPage;i++){
                    ul.append("<li><a href="+i+">"+i+"</a></li>");
                }
                ul.append("<li><a href="+(totalPage+1)+">&raquo;</a></li>");
            }else{
                ul.append("<li><a href="+(totalPage-1)+">&laquo;</a></li>");
                for(var j=1;j<=totalPage;j++){
                    ul.append("<li><a href="+j+">"+j+"</a></li>");
                }
                ul.append("<li><a href="+(totalPage+1)+">&raquo;</a></li>");
            }
        }
    },"json");
}
var tableBody=$("#tableList");//表格
/*========================切换状态事件===================*/
tableBody.on("click",".del",function(){
    let delid = $(this).attr("sid");
    let state=$(this).attr("state");//当前状态
    state= state ==0?1:0;
    $.post("/fashionList/deleteFas.do",{"id": delid,'state':state},function(data){
        list();
    },"json");
});
/*========================动态修改事件===================*/
var upid;
var upImg;//修改的图片路径
tableBody.on("click",".upd",function() {
    $("#myModal").modal();
    upid = $(this).attr("sid");
    //console.log(upid);
    $.post("/fashionList/list.do",{"id": upid},function(data){
        //console.log(data[0].f_article);
        $("#keyTit").val(data[0].f_Keywords);
        $("#fashionTit").val(data[0].f_title);
    },"json");
});
var ss=$("#storyImg");
/*修改文章，封面图片*/
$("#upStoryImg").change(function(){
    var addForm=$("#upForm")[0];
    let fromData=new FormData(addForm);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        ss.css('width','100px');
        ss[0].src=data;
    })

});
/*修改保存事件*/
$("#myBtn2").click(function (){
    var keyTit = $("#keyTit").val();
    var fashionTit = $("#fashionTit").val();
    var upImg=ss.attr("src");
    //console.log(upImg);
    $.post("/fashionList/update.do",{"id": upid,"keyTit":keyTit,"fashionTit":fashionTit,'upImg':upImg}, function (data) {
        list();
    });
});

/*=====================增加===================*/
//点击新增资讯，出现新增页面
$("#addBtn").click(function(){
    $("#addBrand").modal();
});
//新增资讯下的新增文章内容
$('#addTit').click(function(){
    $('#addTitle').modal();
    $(".ke-container").css({'margin':'20px'})
});
//*================新增资讯下的富文本获取值===================*/
$("#myBtnAdd").click(function(){
    "use strict";
    editorContent=editor1.html();
});
/*新增文章，封面图片*/
$("#upAddImg").change(function(){
    var addForm=$("#addForm")[0];
    let fromData=new FormData(addForm);
    //console.log(54654654);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        //console.log(data);
        $("#storyAddImg")[0].src=data;
    })
});
//新增资讯文章保存
$("#myBtn").click(function (){
    var fashionName = $("#fashionName").val();
    var fashionTil = $("#fashionTil").val();
    var storyAddImg = $("#storyAddImg")[0].src;
    //console.log(editorContent);
    $.post("/fashionList/add.do",{'fashionName':fashionName,'fashionTil':fashionTil,'storyAddImg':storyAddImg,'editorContent':editorContent},function(data){
        $(".modal-dialog").modal("hide");
        $("#listStory").html(data[0].f_artical);
        list();
    })
});
//点击修改，弹出修改框
$("#fashionUpdate").click(function(){
    $('#updateTitle').modal();
    $(".ke-container").css({'margin':'20px auto'});
    $.post("/fashionList/list.do",{"id": upid},function(data){
        editor.html(data[0].f_artical)
    },"json");
    editor.html();
    //修改文章保存
    $("#saveBtn").click(function(){
        var f_artical= editor.html();
        $.post("/fashionList/updateTitle.do",{'id':upid,'f_artical':f_artical},function(data){
            $(".modal-dialog").modal("hide");
            $("#listStory").html(data[0].f_artical)
        })
    });
});
/*删除文章内容*/
$("#fashionDelete").click(function(){
    $.post('/fashionList/deleteTile.do',{"id": upid},function(data){
        $("#listStory").html(data[0].f_artical);
        list();
    },'json')
});
/*=====================点击文章标题，查看文章===================*/
//弹出文章框
tableBody.on("click",".fashionTitle",function(){
    $("#fashionTitle").modal();
    upid = $(this).prev().prev().html();
    //console.log(upid);
    $.post("/fashionList/list.do",{"id": upid},function(data){
        //console.log(data[0].f_artical);
        var aa=data[0].f_artical;
        if(aa==null){
            $("#listStory").html("没有文章");
            $("#fashionAdd").css('display','block');
            $("#fashionDelete").css('display','none');
            $("#fashionUpdate").css('display','none');
            $(".btn1").css('float','left')
        }else{
            $("#fashionAdd").css('display','none');
            $("#fashionDelete").css('display','block');
            $("#fashionUpdate").css('display','block');
            $("#listStory").html(data[0].f_artical);
            $(".btn1").css('float','left')
        }
    },"json");

});
//查看文章下的新增，弹出新增框
$("#fashionAdd").click(function(){
    $("#addTitle").modal();
    editor1.html(' ');
    $("#myBtnAdd").click(function(){
        var ff= editor1.html();
        $.post("/fashionList/addTitle.do",{'id':upid,'ff':ff},function(data){
            $(".modal-dialog").modal("hide");
            console.log(data);
            $("#listStory").html(data[0].f_artical);
            list();
        })
    })
});