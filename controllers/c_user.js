// 导入m_user.js
const m_user = require('../models/m_user');

// 渲染登录页面
const showSignin = (req, res) => {
    res.render('signin.html');
};

// 处理登录的请求
const handleSignin = (req,res) =>{
    // console.log('连通了数据');
    // 1.获取表单数据
    const body = req.body;
    // console.log(body);
    // 调用Models中验证邮箱的方法
    // 目的：获取数据库操作返回的结果err,data
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            // return res.send(err)
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        }
        //邮箱不存在
        if (!data[0]) {
            console.log('邮箱不存在');

            return res.send({
                code: 1,
                message: '邮箱不存在'
            })
        }
        // 邮箱存在
        // 3.后验证密码
        if (body.password != data[0].password) {
            return res.send({
                code: 2,
                message: '密码错误'
            })
        }
        // 把正确的用户信息data[0]保存到session
        // body.parser       req.body 
        // express.session   req.session
        // express-session包 保存的数据 不是持久化保存
        // mysql包 express-mysql-session
        // express-mysql-session 
        // 把express-session保存的心思req.session自动保存在数据库中

        req.session.user = data[0];
        console.log(req.session.user);
        // 4.跳转到话题表页
        res.send({
            code: 200,
            message: '可以跳转了'
        })
    });
    // 2.先验证邮箱
    // const sqlstr = 'SELECT * FROM `users` WHERE email=?';
    // connection.query(sqlstr,body.email,(err,data)=>{
    //     if(err){
    //         // throw err;
    //         return res.send(err)
    //     }
    //     // 邮箱不存在
    //     if(!data[0]){
    //         return res.send('邮箱不存在，请注册！')
    //     }
    //     // 邮箱存在
    //     // 3.后验证密码
    //     if (body.password != data[0].password){
    //         return res.send('密码错误！')
    //     }
    //     // 4.跳转到话题表页
    //     res.redirect('/');
    // })
    // 3.后验证密码
    // 4.跳转到话题列表页
};

// 处理用户退出的请求
exports.handleSigninout = (req,res) =>{
    // 清除session 中保存的用户信息
    delete req.session.user;

    // 跳转到用户登录页面
    res.redirect('/signin');
}

exports.showSignin = showSignin;
exports.handleSignin = handleSignin;