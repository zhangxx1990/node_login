    // 导入模型文件
    const m_topic = require('../models/m_topic')
    const moment = require('moment')
    
    exports.showTopic = (req,res) => {
        // res.send('话题列表页');
        // 要数据 - 让模型去去给我数据 - 调用模型.方法
        m_topic.findAllTopic((err,data) =>{
            if(err){
                return res.send({
                    code: 500,
                    message: '服务器错误！'
                });
            }
            console.log(data);
            // data 类型 是数组
            // 如果用户登录成功，把用户信息进行传递 在header.html使用
            res.render('index.html',{
                topics:data,
                user:req.session.user
            });
                
        });
    };

    // 发布新话题
    exports.createTopic = (req,res)=>{
        res.render('topic/create.html')
    };

    // 处理发布新话题的表单
    exports.handleCreateTopic = (req,res) =>{
        const body = req.body;

        // 给body设置createdAt时间
        body.createdAt = moment().format();
        // 给每个话题添加userId 目的是区分当前要添加的话题是哪个用户创建的
        // 要找用户id 先找到用户 req.session.user.id
        body.userId = req.session.user.id;

        // 把body添加到数据库中
        // 找模型文件中的某个方法
        m_topic.addTopic(body,(err,data) =>{
            // 操作数据库返回的结果
            if(err){
                return res.send({
                    code:500,
                    message:'服务器错误'
                });
            }
        // m_topic.xxxx
        // 添加成功返回响应 code == 200
            res.send({
                code:200,
                message:'发布新话题成功'
            });
        });
    };

    // 要渲染话题详情页
    exports.showDetail = (req,res) =>{
        // 获取topicID
        // console.log(req.params);
        // 拿到详情页的id值
        const topicID = req.params.topicID;
        // 根据话题的id值 topicID  去数据库找到话题数据
        // 让模型操作数据库 返回结果
        m_topic.findTopicByID(topicID,(err,data)=>{
            if(err){
                return res.send({
                    code:500,
                    message:'服务器错误'
                });
            }
            console.log(data); 
            res.render('topic/show.html',{
                topic:data[0],
                userid: req.session.user.id
            }); 
        });
    };

    // 渲染话题编辑页
    exports.showEdit = (req,res) =>{
       // 1.获取topic 
       const topicID = req.params.topicID;
       // 拿到新的表单数据
    //    const body = req.body;
       // 2.让 m_topic模型 去操作数据库  返回结果
       // 找到条件topicID查询数据  并修改
       m_topic.findTopicByID(topicID,(err,data)=>{
            if(err){
                return res.send({
                        code: 500,
                        err: '服务器错误'
                })
            }

        res.render('topic/edit.html',{
            topic:data[0]
        });
       })
    //    m_topic.updateTopicByID(topicID,body,(err,data)=>{
    //        if(err){
    //            return res.send({
    //                 code: 500,
    //                 err: '服务器错误'
    //            })
    //        }
    //        res.send({
    //            code: 200,
    //            message: '编辑成功'
    //        })
    //    });
    //    // 3.
    //     res.render('topic/edit.html',{

    //     });
    
    }

    // 处理编辑页面的表单请求
    exports.handleEditTopic = (req,res)=>{
        // 1.获取表单数据req.body
        const body = req.body;
        // 2.获取表单数据
        // req.params
        const topicID = req.params.topicID;
        // 3.修改数据 根据topID找到修改的数据 req.body
        m_topic.updateTopicByID(topicID,body,(err,data)=>{
            if(err){
                return res.send({
                    code: 500,
                    err: '服务器错误'
                });
            }
            res.send({
                code: 200,
                message: '编辑成功'
            })
        });
    }