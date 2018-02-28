/*=======================查询=====================*/
$("#searchBtn").click(function(){
    //alert(555);
    list();
});
//显示数据
function list(){
    var companyName=$("#companyName").val();
    var compPeople=$("#compPeople").val();
    var peoplePhone=$("#peoplePhone").val();
    var compPhone=$("#compPhone").val();
    //console.log(companyName);
    var param="companyName="+companyName+"&compPeople="+compPeople+"&peoplePhone="+peoplePhone+"&compPhone="+compPhone;
    $.post("/companyList/search.do",param,function(data){
        console.log(data);
        document.getElementById("tableList").innerHTML="";
        for(var zz=0;zz<data.length;zz++){
            document.getElementById("tableList").innerHTML+="" +
            "<tr class='text-c'>" +
            "<td><input type='checkbox'></td> " +
            "<td>"+data[zz].c_id+"</td> " +
            "<td>"+data[zz].c_name+"</td> " +
            "<td>"+data[zz].c_address+"</td> " +
            "<td>"+data[zz].c_contacts+"</td> " +
            "<td>"+data[zz].c_contactsTel+"</td> " +
            "<td>"+data[zz].c_tel+"</td> " +
            "<td>"+data[zz].create_time+"</td> " +
            "<td>"+data[zz].state+"</td> " +
            "<td><span title='切换状态' class='del  fa fa-refresh' sid="+data[zz].c_id+"></span > &nbsp; <span title='修改' class='upd fa fa-edit' sid="+data[zz].c_id+"></span></td> " +
            "</tr>";
        }
    },"json");
}
/*========================动态删除事件===================*/
var delid;
$("#tableList").on("click",".del",function() {
    $("#delRole").modal();
    delid = $(this).attr("sid");
});
function deleteCompany(){
    var param = "id=" + delid;
    //alert(param);
    $.post("/companyList/delete.do",param, function (data) {
        list();
    })
}
/*========================动态修改事件===================*/
var upid;
$("#tableList").on("click",".upd",function() {
    $("#myModal").modal();
    upid = $(this).attr("sid");
    var param = "id=" + upid;
    //console.log(param);
    $.post("/companyList/list.do",param,function(data){
        $("#comName").val(data[0].c_name);
        $("#comAddress").val(data[0].c_name);
        $("#comPeo").val(data[0].c_contacts);
        $("#comPeoPhone").val(data[0].c_contactsTel);
        $("#comPone").val(data[0].c_tel);
    },"json");
});
$("#myBtn2").click(function () {
    var comName=$("#comName").val();
    var comAddress=$("#comAddress").val();
    var comPeo=$("#comPeo").val();
    var comPeoPhone=$("#comPeoPhone").val();
    var comPone=$("#comPone").val();
    //console.log(param);
    $.post("/companyList/update.do",{"id": upid,"comName":comName,"comAddress":comAddress,"comPeo":comPeo,"comPeoPhone":comPeoPhone,"comPone":comPone}, function (data) {
        list();
    });
});

/*=====================增加公司===================*/
//点击新增按钮，出现新增页面
$("#addBtn").click(function(){
    $("#myModal2").modal();
});
//点击确认按钮，保存新增数据
$("#myBtn").click(function(){
    var compName=$("#compName").val();
    var compAddress=$("#compAddress").val();
    var compPeo=$("#compPeo").val();
    var compPeoPhone=$("#compPeoPhone").val();
    var comPhone=$("#comPhone").val();
    var comDate=$("#comDate").val();
    $.post("/companyList/add.do",{"compName": compName,"compAddress":compAddress,"compPeo":compPeo,"compPeoPhone":compPeoPhone,"comPhone":comPhone,"comDate":comDate},function(data){
        list();
    });
});
