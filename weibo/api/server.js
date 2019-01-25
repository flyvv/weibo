const express=require("express");
const db=require("./modules/db");
const bodyParser=require("body-parser");
const common=require("./modules/common");
const app=express();
app.use(bodyParser.json());
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})
app.get("/getweibo",function(req,res){
   
    // 分页
    var pageSum = 1; //总页数初始化
    var pageIndex = req.query.pageIndex?req.query.pageIndex/1:1; // 当前页数
    var pageNum=5; // 每页显示信息条数
    db.count("contextList",{},function(count){
        pageSum = Math.ceil(count/pageNum);
        // 安全判断 
        if(pageSum < 1) pageSum = 1 ;
        if(pageIndex < 1) pageIndex =1 ;
        if(pageIndex > pageSum) pageIndex = pageSum ;
        db.find("contextList",{
            sortObj:{addTime:-1},
            limitNum:pageNum,
            skipNum:(pageIndex - 1)* pageNum
        },function(err,contextList){
            res.json({
                ok:1,
                contextList, //每页显示的信息
                pageSum, //总页数
                pageIndex //当前页数
            })
        })    
    })
})
app.post("/addWeibo",function(req,res){
   
     console.log(req.body.context);
    db.insertOne("contextList",{
        context:req.body.context,
        addTime:Date.now(),
        topNum:0,
        downNum:0
    },function(err,results){
        // post
        res.json({
            ok:1,
            msg:"成功"
        })
    })
})

app.get("/deleteweibo",function(req,res){
    db.deleteOneById("contextList",req.query.id,function(err,results){
        res.json({
            ok:1,
            msg:"success!"
        })
    })
}) 
app.get("/topweibo",function(req,res){
    var obj={
        $inc:{}
    };
    if(req.query.type/1 === 1){
        obj.$inc = {
            topNum:1
        }
    }else{
        obj.$inc = {
            downNum:1
        }   
    }
    db.updateOneById("contextList",req.query.id,obj,function(err,results){
        res.json({
            ok:1,
            msg:"success!"
        })
    })
})   
app.listen(8081,function(){
    console.log("success");
})
