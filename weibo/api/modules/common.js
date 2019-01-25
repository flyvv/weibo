// 共有模块
// urlencoded---对象
// a=1&b=2------{a:1,b:2}
module.exports.querystring=function(str){// a=1&b=2
    var arr=str.split("&");// ["a=1","b=2"]
    var obj={};
    for(var i=0;i<arr.length;i++){
        //arr[0]="a=1";
        var arr2=arr[i].split("=");// ["a","1"]
        obj[arr2[0]]=arr2[1];
    }
    return obj;
}
// 获得当前时间
module.exports.getNowTime=function(){
    var date=new Date();
    return (date.getFullYear()
        +"-"+(date.getMonth()+1).toString().padStart(2,"0")
        +"-"+date.getDate().toString().padStart(2,"0")
        +" "+date.getHours().toString().padStart(2,"0")
        +":"+date.getMinutes().toString().padStart(2,"0")
        +":"+date.getSeconds().toString().padStart(2,"0"));
}
// 发送响应结果
module.exports.end=function(res,ok=2,msg="网络连接错误"){
    res.end(JSON.stringify({
        ok,
        msg
    }))
}