/**
 * 作者：刘德福
 * 时间：2017/9/27 12:37
 */
//导航栏部分的js
var ldfUlA = $(".nav-option > li > a:not(.base-a)");
//var ldfLastLi = $(".nav-option > li:nth-last-of-type(1)");
var ldfLastLi = $(".nav-option > li");
var ldfLastLiA = $(".nav-option > li:nth-last-of-type(1) > div ul a");
ldfUlA.each(function (i,a) {
    $(a).on("click",function () {
        ldfChangeAction(this);
    });
});
ldfLastLiA.each(function (i,a) {
    $(a).on("click",function () {
        event.stopPropagation();
        ldfChangeAction(this);
        event.stopPropagation();
    });
});
ldfLastLi.on("click",function () {
    if(!$(this).get(0).getAttribute("class")){
        $(this).addClass("changeRotate");
        flag = false;
    }else{
        $(this).removeClass("changeRotate");
        flag = true;
    }
});
function ldfChangeAction(obj) {
    var ldfUlAList = $(".nav-option a:not(.base-a)");
    for (var i = 0;i<ldfUlAList.length;i++){
        $(ldfUlAList[i]).removeClass("active");
    }
    $(obj).addClass("active");
}

//role数据的获取
var ldfRoleArry = window.top.roleArry;
var ldfRoleTableOne = $(".table-body-one");
var ldfRoleTableTwo = $(".table-body-two");
var modifyRoleFrame = $(".roleList-form");
var modifyRoleDiv;
console.log(modifyRoleFrame);
function roleList() {
   /* for(var i = 0;i<ldfRoleArry.length;i++){
        var str = "";
        str ="<tr aria-label="+ldfRoleArry[i].id+">" +
            "<td>"+(ldfRoleArry[i].id+1)+"</td>" +
            "<td>"+ldfRoleArry[i].roleName+"</td>" +
            "<td>"+ldfRoleArry[i].roleDescribe+"</td>" +
            "<td>"+ldfRoleArry[i].roleNote+"</td>" +
            "<td>" +
            '<span class="fa fa-pencil-square-o" data-toggle="modal"' +
            ' data-target="#modifyRole" onclick="modifyRoleOne(this);"></span>' +
            '<span class="fa fa-trash" data-toggle="modal" ' +
            'data-target="#delRole" onclick="confirmRole(this);"></span>' +
            "</td>" +
            "</tr>";
        if($(ldfRoleTableOne).children("tr").length>8){
            ldfRoleTableTwo.append(str);
            $(".page-frame").css("display","block");

            $(".page-frame>ul>li>a").hover(
                confirmPageOne(this),confirmPageTwo(this));
            $(".page-frame>ul>li:nth-of-type(2)>a").focus();
            if($(".page-frame>ul>li:nth-of-type(2)>a").focus()){
                confirmPageOne(this);
                $(".page-frame>ul>li:nth-of-type(2)>a").hover(
                    confirmPageOne(this),confirmPageOne(this));
            }
            //判断能否翻页
            if($(ldfRoleTableOne).children("tr").length>8){
                $(".page-frame>ul>li:nth-of-type(1)>a").on("click",ChangePagePrev);
                $(".page-frame>ul>li:nth-of-type(2)>a").on("click",function () {
                    $(this).focus();
                    ChangePagePrev();
                });
                $(".page-frame>ul>li:nth-of-type(3)>a").on("click",function () {
                    $(this).focus();
                    ChangePageNext();
                });
                $(".page-frame>ul>li:nth-of-type(8)>a").on("click",ChangePageNext);
            }else {
                $(".page-frame>ul>li:nth-of-type(1)>a").on("click",null);
                $(".page-frame>ul>li:nth-of-type(2)>a").on("click",null);
                $(".page-frame>ul>li:nth-of-type(3)>a").on("click",null);
                $(".page-frame>ul>li:nth-of-type(8)>a").on("click",null);
            }
        }else {
            ldfRoleTableOne.append(str);
        }
    }
    //角色为空的提示
    if(($(ldfRoleTableOne).children("tr").length<=0)&&
        ((typeof ($(".roleTable").get(0)))!="undefined")){
        $(".roleTable").get(0).style.display = "none";
        $(".warning-frame").get(0).style.display = "block";
    }else if(($(ldfRoleTableOne).children("tr").length>0)&&
        ((typeof ($(".warning-frame").get(0)))!="undefined")){
        $(".warning-frame").get(0).style.display = "none";
        $(".roleTable").get(0).style.display = "table";
    }*/
}
roleList();

//role数据的添加
function AddRole(obj) {
   /* obj.setAttribute("href","javascript:void(0);");
    var AddRoleInfo = $(obj).parents("form").children("div");
    var roleArryLength = window.top.roleArry.length;
    var str = {
        "id":"",
        "No":"",
        "roleName":"",
        "roleDescribe":"",
        "roleNote":""
    };
    //规则
    var ldfRegExp = /^(\w|[\u2E80-\u9FFF]|"_")(.{0,19})$/g;
    var ldfRegExpOne = /\s$/g;
    var ldfRegExpTwo = /(\s)\1/g;
    var ldfRegExpThree = /^(\w|[\u2E80-\u9FFF]|"_")(.{0,49})$/g;
    var ldfRegExpFour = /.{0,50}/g;
    var ldfRegExpFive = /^\d/g;
    var ldfFlag = true;

    //创建角色模板
    str.id = roleArryLength;
    str.No = roleArryLength + 1;
    for(var i = 0;i<AddRoleInfo.length;i++){
        var roleDate = AddRoleInfo[i].lastElementChild.value;
        if(i===0){
            str.roleName = roleDate;
        }else if(i===1){
            str.roleDescribe = roleDate;
        }else if(i===2){
            str.roleNote = roleDate;
        }
        console.log(roleDate);
    }

    //判断是否有相同的角色名称
    for(var j = 0;j<window.top.roleArry.length;j++){
        if(str.roleName === window.top.roleArry[j].roleName){
            ldfFlag = false;
        }
    }

    //所有的正则表达式属性下标清零
    function RoleLastIndexTwo() {
        ldfRegExp.lastIndex = 0;
        ldfRegExpOne.lastIndex = 0;
        ldfRegExpTwo.lastIndex = 0;
        ldfRegExpThree.lastIndex = 0;
        ldfRegExpFour.lastIndex = 0;
        ldfRegExpFive.lastIndex = 0;
    }

    //提示信息
    if((!ldfRegExp.test(str.roleName))
        || (ldfRegExpTwo.test(str.roleName))
        || (ldfRegExpOne.test(str.roleName))
        || (ldfRegExpFive.test(str.roleName))){
        AddRoleInfo[0].lastElementChild.style.borderColor = "red";
        $(AddRoleInfo[0].lastElementChild).on("focus",function () {
            AddRoleInfo[0].lastElementChild.style.borderColor = "#ccc";
            $(".Roletip-Add").text("");
        });
        RoleLastIndexTwo();
        if(!(ldfRegExp.test(str.roleName))){
            if(str.roleName.length>20){
                $(".Roletip-Add").text("抱歉，您输入的角色名称长度超过了20位！请重新输入。");
            }else if(str.roleName===""){
                $(".Roletip-Add").text("抱歉，您添加的角色名称不能为空！请重新输入。");
            }else{
                $(".Roletip-Add").text("抱歉，请您输入以字母/汉字/'_'开头的角色名称！");
                console.log(ldfRegExp.test(modifyRoleDiv[0].lastElementChild.value)+"1");
            }
            console.log("wode3");
        }
        if(ldfRegExpTwo.test(str.roleName)){
            $(".Roletip-Add").text("抱歉，您输入的角色名称中包含了双重空格！请重新输入。");
            console.log("wode2");
        }
        if(ldfRegExpOne.test(str.roleName)){
            $(".Roletip-Add").text("抱歉，您输入的角色名称的末尾有空格！请重新输入。");
        }
        if(ldfRegExpFive.test(str.roleName)){
            $(".Roletip-Add").text("抱歉，请您输入以字母/汉字/'_'开头的角色名称！");
        }
        RoleLastIndexTwo();
    }
    else if((!ldfRegExpThree.test(str.roleDescribe))
        || ldfRegExpTwo.test(str.roleDescribe)
        || ldfRegExpOne.test(str.roleDescribe)){
        AddRoleInfo[1].lastElementChild.style.borderColor = "red";
        $(AddRoleInfo[1].lastElementChild).on("focus",function () {
            AddRoleInfo[1].lastElementChild.style.borderColor = "#ccc";
            $(".Roletip-Add").text("");
        });
        RoleLastIndexTwo();
        if(!(ldfRegExpThree.test(str.roleDescribe))){
            if(str.roleDescribe.length>50){
                $(".Roletip-Add").text("抱歉，您输入的描述文字长度超过了50位！请重新输入。");
            }else if(str.roleDescribe===""){
                $(".Roletip-Add").text("抱歉，您输入的描述文字不能为空！请重新输入。");
            }else{
                $(".Roletip-Add").text("抱歉，请您输入以字母/汉字/'_'开头的描述文字！");
            }
        }
        if(ldfRegExpTwo.test(str.roleDescribe)){
            $(".Roletip-Add").text("抱歉，您输入的描述文字中包含了双重空格！请重新输入。");
        }
        if(ldfRegExpOne.test(str.roleDescribe)){
            $(".Roletip-Add").text("抱歉，您输入的描述文字的末尾有空格！请重新输入。");
        }
        RoleLastIndexTwo();
    }
    else if((!ldfRegExpFour.test(str.roleNote)
        || ldfRegExpTwo.test(str.roleNote)
        || ldfRegExpOne.test(str.roleNote))){
        AddRoleInfo[2].lastElementChild.style.borderColor = "red";
        $(AddRoleInfo[2].lastElementChild).on("focus",function () {
            AddRoleInfo[2].lastElementChild.style.borderColor = "#ccc";
            $(".Roletip-Add").text("");
        });
        RoleLastIndexTwo();
        if(!(ldfRegExpFour.test(str.roleNote))){
            $(".Roletip-Add").text("抱歉，您输入的备注文字长度超过了50位！请重新输入。");
        }
        if(ldfRegExpTwo.test(str.roleNote)){
            $(".Roletip-Add").text("抱歉，您输入的备注文字中包含了双重空格！请重新输入。");
        }
        if(ldfRegExpOne.test(str.roleNote)){
            $(".Roletip-Add").text("抱歉，您输入的备注文字的末尾有空格！请重新输入。");
        }
        RoleLastIndexTwo();
    }
    else{
        if(ldfFlag){
            obj.setAttribute("href","roleList.html");
            window.top.roleArry.push(str);
        }else {
            AddRoleInfo[0].lastElementChild.style.borderColor = "red";
            $(AddRoleInfo[0].lastElementChild).on("focus",function () {
                AddRoleInfo[0].lastElementChild.style.borderColor = "#ccc";
                $(".Roletip-Add").text("");
            });
            $(".Roletip-Add").text("抱歉，您输入的用户名已经存在！");
        }
    }*/
}
//删除role的数据
//var ldfRole;
//var modifyRoleId;
//var roleModifyBtn = $(".modify-btn");
//function confirmRole(obj) {
//    ldfRole = $(obj).parents("tr");
//}
//function delRole() {
//    //删除应该需要父窗口的数组删除，不然刷新无法实现删除效果
//    window.top.roleArry.splice(ldfRole.attr("aria-label"),1);
//    ldfRole.remove();
//    for(var i = 0;i<window.top.roleArry.length;i++){
//        if(i!=window.top.roleArry[i].id){
//            window.top.roleArry[i].id = i;
//        }
//    }
//    window.location.reload();
////    在 window.location.reload(); 语句后的样式设置都不能起作用
//}
//
////修改role的数据
//function modifyRoleOne(obj) {
//    modifyRoleDiv = modifyRoleFrame.get(0).children;
//    modifyRoleId = $(obj).parents("tr").attr("aria-label");
//    modifyRoleDiv[0].lastElementChild.value =
//        window.top.roleArry[modifyRoleId].roleName;
//    modifyRoleDiv[1].lastElementChild.value =
//        window.top.roleArry[modifyRoleId].roleDescribe;
//    modifyRoleDiv[2].lastElementChild.value =
//        window.top.roleArry[modifyRoleId].roleNote;
//
//    //用于清除前一次操作的残留
//    roleModifyBtn.get(0).setAttribute("data-dismiss","");
//    for(var i = 0;i<modifyRoleDiv.length;i++){
//        modifyRoleDiv[i].lastElementChild.style.borderColor = "#ccc";
//    }
//    $(".Roletip").text("");
//}
//function modifyRoleTwo(){
//    //var ldfRegExp = /^(\w|[\u2E80-\u9FFF]|"_")(.{0,19})$/g;
//    //var ldfRegExpOne = /\s$/g;
//    //var ldfRegExpTwo = /(\s)\1/g;
//    //var ldfRegExpThree = /^(\w|[\u2E80-\u9FFF]|"_")(.{0,49})$/g;
//    //var ldfRegExpFour = /.{0,50}/g;
//    //var ldfRegExpFive = /^\d/g;
//    //var ldfFlag = true;
//    //var modifyInfoOne = modifyRoleDiv[0].lastElementChild;
//    //var modifyInfoTwo = modifyRoleDiv[1].lastElementChild;
//    //var modifyInfoThree = modifyRoleDiv[2].lastElementChild;
//    ////所有的正则表达式属性下标清零
//    //function RoleLastIndex() {
//    //    ldfRegExp.lastIndex = 0;
//    //    ldfRegExpOne.lastIndex = 0;
//    //    ldfRegExpTwo.lastIndex = 0;
//    //    ldfRegExpThree.lastIndex = 0;
//    //    ldfRegExpFour.lastIndex = 0;
//    //    ldfRegExpFive.lastIndex = 0;
//    //}
//    ////判断是否有相同的角色名称
//    //for(var i = 0;i<window.top.roleArry.length;i++){
//    //    if(modifyRoleDiv[0].lastElementChild.value === window.top.roleArry[i].roleName){
//    //        ldfFlag = false;
//    //    }
//    //}
//    ////提示信息
//    //if((!ldfRegExp.test(modifyInfoOne.value))
//    //    || (ldfRegExpTwo.test(modifyInfoOne.value))
//    //    || (ldfRegExpOne.test(modifyInfoOne.value))
//    //    || (ldfRegExpFive.test(modifyInfoOne.value))){
//    //    modifyInfoOne.style.borderColor = "red";
//    //    $(modifyInfoOne).on("focus",function () {
//    //        modifyInfoOne.style.borderColor = "#ccc";
//    //        $(".Roletip").text("");
//    //    });
//    //    RoleLastIndex();
//    //    if(!(ldfRegExp.test(modifyInfoOne.value))){
//    //        if(modifyInfoOne.value.length>20){
//    //            $(".Roletip").text("抱歉，您输入的角色名称长度超过了20位！请重新输入。");
//    //        }else if(modifyInfoOne.value===""){
//    //            $(".Roletip").text("抱歉，您输入的角色名称不能为空！请重新输入。");
//    //        }else{
//    //            $(".Roletip").text("抱歉，请您输入以字母/汉字/'_'开头的角色名称！");
//    //            console.log(ldfRegExp.test(modifyRoleDiv[0].lastElementChild.value)+"1");
//    //        }
//    //        console.log("wode3");
//    //    }
//    //    if(ldfRegExpTwo.test(modifyInfoOne.value)){
//    //        $(".Roletip").text("抱歉，您输入的角色名称中包含了双重空格！请重新输入。");
//    //        console.log("wode2");
//    //    }
//    //    if(ldfRegExpOne.test(modifyInfoOne.value)){
//    //        $(".Roletip").text("抱歉，您输入的角色名称的末尾有空格！请重新输入。");
//    //    }
//    //    if(ldfRegExpFive.test(modifyInfoOne.value)){
//    //        $(".Roletip").text("抱歉，请您输入以字母/汉字/'_'开头的角色名称！");
//    //    }
//    //    RoleLastIndex();
//    //}
//    //else if((!ldfRegExpThree.test(modifyInfoTwo.value))
//    //    || ldfRegExpTwo.test(modifyInfoTwo.value)
//    //    || ldfRegExpOne.test(modifyInfoTwo.value)){
//    //    modifyInfoTwo.style.borderColor = "red";
//    //    $(modifyInfoTwo).on("focus",function () {
//    //        modifyInfoTwo.style.borderColor = "#ccc";
//    //        $(".Roletip").text("");
//    //    });
//    //    RoleLastIndex();
//    //    if(!(ldfRegExpThree.test(modifyInfoTwo.value))){
//    //        if(modifyInfoTwo.value.length>50){
//    //            $(".Roletip").text("抱歉，您输入的描述文字长度超过了50位！请重新输入。");
//    //        }else if(modifyInfoTwo.value===""){
//    //            $(".Roletip").text("抱歉，您输入的描述文字不能为空！请重新输入。");
//    //        }else{
//    //            $(".Roletip").text("抱歉，请您输入以字母/汉字/'_'开头的描述文字！");
//    //        }
//    //    }
//    //    if(ldfRegExpTwo.test(modifyInfoTwo.value)){
//    //        $(".Roletip").text("抱歉，您输入的描述文字中包含了双重空格！请重新输入。");
//    //    }
//    //    if(ldfRegExpOne.test(modifyInfoTwo.value)){
//    //        $(".Roletip").text("抱歉，您输入的描述文字的末尾有空格！请重新输入。");
//    //    }
//    //    RoleLastIndex();
//    //}
//    //else if((!ldfRegExpFour.test(modifyInfoThree.value))
//    //    || ldfRegExpTwo.test(modifyInfoThree.value)
//    //    || ldfRegExpOne.test(modifyInfoThree.value)){
//    //    modifyInfoThree.style.borderColor = "red";
//    //    $(modifyInfoThree).on("focus",function () {
//    //        modifyRoleDiv[2].lastElementChild.style.borderColor = "#ccc";
//    //        $(".Roletip").text("");
//    //    });
//    //    RoleLastIndex();
//    //    if(!(ldfRegExpFour.test(modifyInfoThree.value))){
//    //        $(".Roletip").text("抱歉，您输入的备注文字长度超过了50位！请重新输入。");
//    //    }
//    //    if(ldfRegExpTwo.test(modifyInfoThree.value)){
//    //        $(".Roletip").text("抱歉，您输入的备注文字中包含了双重空格！请重新输入。");
//    //    }
//    //    if(ldfRegExpOne.test(modifyInfoThree.value)){
//    //        $(".Roletip").text("抱歉，您输入的备注文字的末尾有空格！请重新输入。");
//    //    }
//    //    RoleLastIndex();
//    //}else{
//    //    if(ldfFlag){
//    //        roleModifyBtn.get(0).setAttribute("data-dismiss","modal");
//    //        window.top.roleArry[modifyRoleId].roleName =
//    //            modifyInfoOne.value;
//    //        window.top.roleArry[modifyRoleId].roleDescribe =
//    //            modifyInfoTwo.value;
//    //        window.top.roleArry[modifyRoleId].roleNote =
//    //            modifyInfoThree.value;
//    //        window.location.reload();
//    //    }else {
//    //        modifyInfoOne.style.borderColor = "red";
//    //        $(modifyInfoOne).on("focus",function () {
//    //            modifyRoleDiv[0].lastElementChild.style.borderColor = "#ccc";
//    //            $(".Roletip").text("");
//    //        });
//    //        $(".Roletip").text("抱歉，您输入的用户名已经存在！");
//    //    }
//    //}
//}
//
////翻页的函数
//function confirmPageOne(obj) {
//    $(obj).css({
//        "background-color":"#eee",
//        "color":"#23527c",
//        "border-color":"#ddd"
//    });
//}
//function confirmPageTwo(obj){
//    $(obj).css({
//        "background-color":"#ffffff",
//        "color":"#337ab7",
//        "border-color":"#ddd"
//    });
//}
//function ChangePageNext() {
//    var str = $(".table-frame-page");
//    if(str.length===0){
//        $(".table-frame").addClass("table-frame-page");
//        $(".page-frame>ul>li:nth-of-type(3)>a").focus();
//        $(".page-frame>ul>li:nth-of-type(2)>a").blur();
//        if($(".page-frame>ul>li:nth-of-type(3)>a").focus()){
//            confirmPageOne(this);
//            $(".page-frame>ul>li:nth-of-type(3)>a").hover(
//                confirmPageOne(this),confirmPageOne(this)
//            );
//        }
//        if($(".page-frame>ul>li:nth-of-type(2)>a").blur()){
//            confirmPageTwo(this);
//            $(".page-frame>ul>li:nth-of-type(2)>a").hover(
//                confirmPageOne(this),confirmPageTwo(this)
//            );
//        }
//    }
//}
//function ChangePagePrev() {
//    var str = $(".table-frame-page");
//    if(str.length!=0){
//        $(".table-frame").removeClass("table-frame-page");
//        $(".page-frame>ul>li:nth-of-type(2)>a").focus();
//        $(".page-frame>ul>li:nth-of-type(3)>a").blur();
//        if($(".page-frame>ul>li:nth-of-type(2)>a").focus()){
//            confirmPageOne(this);
//            $(".page-frame>ul>li:nth-of-type(2)>a").hover(
//                confirmPageOne(this),confirmPageOne(this)
//            );
//        }
//        if($(".page-frame>ul>li:nth-of-type(3)>a").blur()){
//            confirmPageTwo(this);
//            $(".page-frame>ul>li:nth-of-type(3)>a").hover(
//                confirmPageOne(this),confirmPageTwo(this)
//            );
//        }
//    }
//}









































