// 路由模块
// 目的：监听请求并且找到每个请求的发法名

// 1.导包
// 2.express.Router()获取对象router

// 4.导出对象router

    const express = require('express');
// 导入控制器文件
    const c_user = require('./controllers/c_user');
    const c_topic = require('./controllers/c_topic');
    const router = express.Router();
    // 监听请求    
    // 渲染登录页面的请求
    router
        .get('/signin',c_user.showSignin)
    // 监听登录的表单请求
        .post('/signin',c_user.handleSignin)
    // 渲染话题页面的请求
        .get('/',c_topic.showTopic)
    // 发布文章话题
        .get('/topic/create',c_topic.createTopic)
    // 处理发布新话题表单
        .post('/createTopic',c_topic.handleCreateTopic)
    // 用户退出
        .get('/signout',c_user.handleSigninout)
    // 详情页面请求
        // .get('/topic/detail',c_topic.showDetail);   
        // 动态路由 router.get('/固定标识/:参数名')
        .get('/topic/:topicID',c_topic.showDetail)
    // 监听编辑id
        .get('/topic/:topicID/edit',c_topic.showEdit)
    // 监听编辑页面
        .post('/editTopic/:topicID', c_topic.handleEditTopic)

// 3.router.get()
    module.exports = router;    