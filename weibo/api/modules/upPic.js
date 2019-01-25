const formidable=require("formidable");
const fs=require("fs");
/*
* 上传图片
* 将上传图片的结果返回出去
* cb({
*   ok:1,//1、成功， 2、上传异常 3、未上传图片
* })*/
module.exports.upPic=function(req,picName,cb){
    var form=new formidable.IncomingForm();
    form.encoding="utf-8";
    form.uploadDir="./upload";
    form.keepExtensions=true;
    form.parse(req,function(err,params,file){
        if(err)
            cb({
                ok:2,
                msg:"网络连接错误"
            })
        else{
            var picInfo=file[picName];
            // 上传了图片
            if(picInfo.size>0){
                var keepArr=[".gif",".png",".jpg"];
                var keepName=picInfo.name.substr(picInfo.name.lastIndexOf(".")).toLowerCase();
                if(keepArr.includes(keepName)){
                    var newPicName=Date.now()+keepName;
                    fs.rename(picInfo.path,"./upload/"+newPicName,function(err){
                        cb({
                            ok:1,
                            params,
                            newPicName
                        })
                    })
                }else{
                    fs.unlink(picInfo.path,function(err){
                        cb({
                            ok:2,
                            msg:"请选择正确的图片：.gif,.png,.jpg"
                        })
                    })
                }
            }else{//  未上传图片
                fs.unlink(picInfo.path,function(err){
                    cb({
                        ok:3,
                        params // 除图片以外的信息
                    })
                })

            }



        }

    })

}