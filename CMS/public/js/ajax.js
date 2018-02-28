/**
 * Created by Administrator on 2017/10/29.
 */
function ajax(method, url, param, fn) {
    "use strict";
    var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHttp")
    }
    if (method == "get") {
        httpRequest.open(method,url+"?"+param,true);
    } else if (method =="post") {
        httpRequest.open(method, url,true);
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            fn(httpRequest.responseText)
        }
    };
    if (method == "get") {
        httpRequest.send(null)
    } else if (method == "post"){
        //httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send(param)
    }
}