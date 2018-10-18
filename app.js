// 程序入口文件
// 1.导包
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
// 持久化session包
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database:'node'
};
const sessionStore = new MySQLStore(options);

// 2.app 对象
const app = express();

// 3.配置包
app.engine('html', require('express-art-template'));
// 处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));


// 配置express-mysql-session包
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 注意这行代码的位置
app.use(router);
// 4.绑定端口
app.listen(12346,()=>{
    console.log('正在运行！');
});