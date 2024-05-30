// main.js 或 app.js
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const useRouterUser = require('./routes/route_user');
const userRouterUserInfo = require('./routes/route_userInfo');
const useArticle = require('./routes/route_article')
const app = express();
// 导入解析token所需
const { expressjwt: jwt } = require("express-jwt");
const jwtConfig = require('./config');
const PORT = process.env.PORT || 8000;
const dbUrl = 'mongodb://localhost:27017/news'
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
// 添加 CORS 中间件
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(session({
    secret: 'backlighting',
    name:'captcha',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbUrl }), // 使用 connect-mongo 存储会话
    cookie: {
        maxAge: 1000 * 60 // 1 分钟
    }
    // cookie: { secure: false }   //https
}));
// 添加中间件来解析请求体
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
// 一定要在路由导入之前使用解析token
app.use(
    jwt({
        secret: jwtConfig.jwtSecretKey,
        algorithms: ["HS256"],
    }).unless({ path: ['/api/user/signup', '/api/user/login', '/api/user/forget', '/', '/api/user/getKey','/api/user/captcha'] })
);

// 使用 routes文件夹中定义的路由
app.use('/api/user', useRouterUser);
app.use('/api/article', useArticle)
app.use('/profile', userRouterUserInfo);
app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();
    // use "*" here to accept any origin
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header('Access-Control-Allow-Credentials', 'true');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ("OPTIONS" === req.method) return res.sendStatus(200);
    next();
});
// 定义根路由的处理程序
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});
// 捕获错误
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') return res.send({ success: false, error: '身份认证失败' })
    if (err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
})

// 启动 Express 服务器
app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT} 运行`);
})
