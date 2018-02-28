
/*=======================查询=====================*/
$("#searchBtn").click(function(){
    list();
});
//显示数据
var pageSize=5;//一页显示多少条
var currentPage;//当前页
var totalPage;//总页数
var total;//总条数
function list(){
    var name=$("#brandName").val();
    var company=$("#brandCompany").val();
    //console.log(name)
    var param="name="+name+"&company="+company;
    $.get("/brand/list.do",function(data){
        total=data.length;//总条数
    },"json");
    $.post("/brand/search.do",param,function(data){
        //console.log(data);
        var table=document.getElementById("tableList");
        table.innerHTML="";
        for(var zz=0;zz<data.length;zz++){
            table.innerHTML+="" +
            "<tr class='text-c'>" +
            "<td><input type='checkbox'></td> " +
            "<td>"+data[zz].b_id+"</td> " +
            "<td>"+data[zz].c_name+"</td> " +
            "<td>"+data[zz].b_name+"</td> " +
            "<td><img src='"+data[zz].b_logo+"' alt=''/></td> " +
            "<td>"+data[zz].b_create_time+"</td> " +
            "<td class='brandStory' sid="+data[zz].b_id+">"+data[zz].b_story+"</td> " +
            "<td class='brandDesc content_txt' sid="+data[zz].b_id+">"+data[zz].b_desc+"</td> " +
            "<td><span title='删除数据' class='del fa fa-refresh' sid="+data[zz].b_id+"></span > &nbsp; <span title='修改' class='upd fa fa-edit' sid="+data[zz].b_id+"></span></td> " +
            "</tr>";
        }
        currentPage=data.length;//查到的数据有多少条
        totalPage=Math.ceil(currentPage/pageSize);//查到后的页数1
        var ul= $("#myPage");
        ul.html("");
        if(company==0){
            $("#totalCount").html(total);//如果选择全部，则显示所有数据
            totalPage=Math.ceil(total/pageSize);//查到后的页数2
            ul.append("<li><a href="+(totalPage-1)+">&laquo;</a></li>");
            for(var k=1;k<=totalPage;k++){
                ul.append("<li><a href="+k+">"+k+"</a></li>");
            }
            ul.append("<li><a href="+totalPage+">&raquo;</a></li>");
        }else{
            $("#totalCount").html(currentPage);//如果选择查询，则显示相应数据
            if(totalPage-4<=0){
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
/*========================动态删除事件===================*/
var delid;
tableBody.on("click",".del",function() {
    $("#delRole").modal();
    delid = $(this).attr("sid");
});
function deleteBrand(){
    var param = "id=" + delid;
    //alert(param);
    $.post("/brand/delete.do",param,function (data) {
        list();
    })

}
/*========================动态修改事件===================*/
var upid;
var ss=$("#storyUpImg");
tableBody.on("click",".upd",function() {
    $("#myModal").modal();
    upid = $(this).attr("sid");
    $.post("/brand/list.do",{"id": upid},function(data){
        $("#braName").val(data[0].b_name);
        $("#storyTime").val(data[0].create_time);
        $("#storyTitle").val(data[0].b_story);
        $("#storyUpdateDesc").val(data[0].b_desc);
    },"json");
});
/*修改添加图片*/
$("#UpdateImg").change(function(){
    var addForm=$("#updateForm")[0];
    let fromData=new FormData(addForm);
    //console.log(addForm);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        //console.log(data);//图片路径
        ss[0].src=data;
        ss.css('width','100px');
    })
});
/*确认修改信息*/
$("#myBtn2").click(function (){
    var name = $("#braName").val();
    var storyTime = $("#storyTime").val();
    var storyTitle = $("#storyTitle").val();
    var storyUpdateDesc = $("#storyUpdateDesc").val();
    var ssImg=ss.attr("src");
    //console.log(storyUpdateDesc);
    $.post("/brand/update.do",{"id": upid,"name":name,"storyTime":storyTime,"storyTitle":storyTitle,'ssImg':ssImg,'storyUpdateDesc':storyUpdateDesc}, function (data) {
        list(data);
    });
});
/*=====================增加===================*/
//点击新增按钮，出现新增页面
$("#addBtn").click(function(){
    $("#addBrand").modal();
});
var img=$("#branImg");
/*新增信息添加图片*/
$("#ADDImg").change(function(){
    var addForm=$("#addForm")[0];
    let fromData=new FormData(addForm);
    //console.log(addForm);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        img.css('width','100px');
        img[0].src=data;
    })
});
/*确认添加信息*/
$("#myBtn").click(function(){
    var brandCom=$("#branCompany").val();//所属公司
    var addName=$("#branName").val();//品牌名称
    var branStory=$("#branStory").val();//故事标题
    var comDate=$("#comDate").val();//创建时间
    var storyAddDesc=$("#storyAddDesc").val();//品牌简介
    var brandImg=img.attr("src");//品牌LOGO
    $.post("/brand/add.do",{"brandCom": brandCom,"addName":addName,"branStory":branStory,"comDate":comDate,'brandImg':brandImg,'storyAddDesc':storyAddDesc},function(data){
        list();
    });
});
/*=====================选择所有信息===================*/
function check1(){
    var check=$(".tableCheck");
    if($("#checkBrand").checked=="true"){
        check.attr("checked");
    }else{
        check.attr("checked",'true');
    }
}
/*=====================点击查看品牌故事===================*/
var listId;
var story=$("#listStory");
var storyImg=$("#storyIndex");
tableBody.on("click",".brandStory",function() {
    $("#brandStory").modal();
    listId = $(this).attr("sid");
    var param = "id=" + listId;
    story.html('');
    storyImg.html(' ');
    $.get("/brand/storyList.do",param,function(data){
        var aa=data[0].s_production;//故事内容
        var bb=data[0].s_img;//封面背景
        var cc=data[0].s_id;//故事ID
        if(cc==null||aa==null&&bb==null){
            storyImg.html(" ");
            story.html('没有品牌故事');
            story.css('textAlign','center');
            $("#storyUpdate").css("display","none");
            $("#storyDelete").css("display","none");
            $("#storyAdd").css("display","block");
        }else{
            storyImg.html('<b>品牌故事封面背景图片：</b> <img id="storyImg" src="'+bb+'" alt=""/>');
            story.html(aa);
            $("#storyUpdate").css("display","block");
            $("#storyDelete").css("display","block");
            $("#storyAdd").css("display","none");
        }
    })
});
/*=====================点击新增品牌故事===================*/
/*新增品牌故事图片*/
var addStoryIm=$("#addStoryImg");
$("#storyAddImg").change(function(){
    var addForm=$("#addStoryForm")[0];
    let fromData=new FormData(addForm);
    //console.log(addForm);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        //console.log(data);
        addStoryIm.css({'width':'100px','margin':'0 45%'});
        addStoryIm[0].src=data;
    })
});
//富文本配置
var editor;
var editorContent;
KindEditor.ready(function(K) {
    editor = K.create('#addTxtContent', {
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImg.do',  //图片上传时向服务提交的地址
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',    'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
        height:'300px',
        width:'750px',
        afterUpload : function(url, data, name) { //上传文件后执行的回调函数，必须为3个参数
            if (name == "image") { //单个和批量上传图片时
                var img = new Image();
                img.src = url;
                img.onload = function () { //图片必须加载完成才能获取尺寸
                    if (img.width > 600) editor.html(editor.html().replace('<img ','<img width="800" '))
                }
            }
        }
    });
});
$("#storyAdd").click(function(){
    $("#addStory").modal();
    $(".ke-container").css({'margin':'20px'});//富文本的样式
    $("#myBtnAdd").click(function(){
        var storyImg=addStoryIm.attr('src');
        editorContent=editor.html();//富文本的值
        console.log(editorContent);
        $.post("/brand/storyAdd.do",{"id":listId,'storyImg':storyImg,'editorContent':editorContent},function(data){
            console.log(data[0]);
            story.html(data[0].s_production);
            $("#storyUpdate").css({"display":"block"});
        })
    });
});
/*=====================点击修改品牌故事===================*/
/*修改品牌故事图片*/
var upStoryIm=$("#storyUpdateImg");
$("#UpdateImgBtn").change(function(){
    var addForm=$("#upForm")[0];
    let fromData=new FormData(addForm);
    //console.log(addForm);
    ajax("post","/goodsImgUpload.do",fromData,function(data){
        //console.log(data);
        upStoryIm.css({'width':'100px','margin':'0 45%'});
        upStoryIm[0].src=data;
    })
});
//富文本配置
KindEditor.ready(function(K) {
    editor = K.create('#upTxtContent', {
        allowImageUpload : true, //支持图片上传
        uploadJson: '/uploadImg.do',  //图片上传时向服务提交的地址
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic',
            'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright',    'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
        height:'300px',
        width:'750px',
        afterUpload : function(url, data, name) { //上传文件后执行的回调函数，必须为3个参数
            if (name == "image") { //单个和批量上传图片时
                var img = new Image();
                img.src = url;
                img.onload = function () { //图片必须加载完成才能获取尺寸
                    if (img.width > 600) editor.html(editor.html().replace('<img src="http://localhost:8888/' + url + '"', '<img src="http://localhost:8888/' + url + '" width="800"'))
                }
            }
        }
    });
});
//点击修改，弹出修改框
$("#storyUpdate").click(function(){
    $("#updateStory").modal();
    $(".ke-container").css({'margin':'20px auto'});
    $.get("/brand/storyList.do",{"id":listId},function(data){
        //console.log(data);
        editor.html(data[0].s_production);
        $("#storyImg")[0].src=data[0].s_img;
    });
    //修改文章保存
    $("#saveBtn").click(function(){
        var text=editor.html();
        var StoryImg=upStoryIm.attr('src');
        //console.log(StoryImg);
        $.post("/brand/storyUpdate.do",{"id":listId,'text':text,'StoryImg':StoryImg},function(data){
            //console.log(data[0].s_production);
            story.html(data[0].s_production);
            $("#storyImg")[0].src=data[0].s_img;
        })
    })
});
/*=====================点击删除品牌故事===================*/
$("#storyDelete").click(function(){
    $.post("/brand/deleteStory.do",{"id":listId},function (data) {
        story.html('没有品牌故事');
        $("#storyAdd").css({"display":"block","float":"left"});
    })
});
