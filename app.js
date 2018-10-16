// 程序入口文件
// 1.导包
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
// 2.app 对象
const app = express();

// 3.配置包
app.engine('html', require('express-art-template'));
// 处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));


// 监听请求router.js

// 注意这行代码的位置
app.use(router);
// 4.绑定端口
app.listen(12346,()=>{
    console.log('正在运行！');
});