// 模型文件：操作话题数据库表 并且返回操作库的结果

// 导入db_config.js
const db = require('../tools/db_config');

exports.findAllTopic = (callback) =>{
    const sqlstr = 'SELECT *FROM `topics` ORDER BY `createdAt` DESC';
    db.query(sqlstr,(err,data)=>{
        // 要在c_topic中使用findAllTopic里面query()这个异步操作返回的结果
        // 所以通过回调函数的方式将结果以参数的形式进行传递
        if(err){
            return callback(err,null);
        }
        callback(null,data);
    });

    
}

// 向数据库中添加新话题body
exports.addTopic = (body,callback) =>{
    const sqlstr = 'INSERT INTO `topics`SET ?';
    db.query(sqlstr,body,(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data)
    });
}

// 根据id查询话题数据
exports.findTopicByID = (topicID,callback) =>{
    const sqlstr = 'SELECT *FROM `topics`WHERE id = ?';
    db.query(sqlstr,topicID,(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    });
}

// updateTopicByID 修改数据
exports.updateTopicByID = (topicID,body,callback) =>{
    const sqlstr = 'UPDATE `topics` SET `title`=?,`content`=? WHERE `id`=?';
    db.query(sqlstr,[
        body.title,
        body.content,
        topicID
    ],(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    });
}