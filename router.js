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
// 渲染登录页面的请求
    router.get('/signin',c_user.showSignin);
// 监听登录的表单请求
    router.post('/signin',c_user.handleSignin);
// 渲染话题页面
    router.get('/',c_topic.showTopic);
// 3.router.get()
    module.exports = router;    