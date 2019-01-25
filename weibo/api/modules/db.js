const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;



function _connect(cb){
    // console.log(1);
    // 异步
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client) {
        cb(client.db("vueweibo"));
        // console.log(2);
    });
    // console.log(3);
}
/*
* 添加一条记录
* coll:指定的集合
* obj:添加的内容
* cb;回调函数用于返回结果*/
module.exports.insertOne=function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb);
    })
}
/*
* 获取记录信息
* coll:集合
* obj:条件
*   whereObj：条件
*   sortObj*
* */
module.exports.find=function(coll,obj,cb){
    obj.whereObj=obj.whereObj || {};
    obj.sortObj=obj.sortObj || {};
    obj.skipNum=obj.skipNum || 0;
    obj.limitNum=obj.limitNum || 0;
    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).skip(obj.skipNum).limit(obj.limitNum).toArray(cb)
    })
}
// 根据ID查找相对应的信息
module.exports.findOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}

/*根据条件计算文档的数量*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}
/* 根据ID进行删除 */
module.exports.deleteOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
/*根据ID来进行修改一条*/
module.exports.updateOneById=function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb)
    })
}
