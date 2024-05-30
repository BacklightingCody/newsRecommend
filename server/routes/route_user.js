// 用户请求路由
// 引入 Express
const express = require('express');
const svgCaptcha = require('svg-captcha')
const handleUser = require('../handle_routes/handle_user');
const bcrypt = require('bcrypt');
const { publicKey } = require('../api/generateKey')
// 创建一个 Express 路由实例
const router = express.Router();
// 处理前端发送验证码的请求
router.get('/captcha', async (req, res) => {
    try {
        const captcha = svgCaptcha.create({ size: 4 });
        req.session.captcha = captcha.text.toLowerCase();
        console.log(req.session.captcha,11)
        res.type('svg');
        res.status(200).json({ success: true, message: '验证码发送成功', data: captcha.data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '验证码生成失败' });
    }
});
// 验证验证码
router.post('/verify', async (req, res) => {
    try {
        const userInput = req.body.captcha;
        if (userInput && userInput.toUpperCase() === req.session.captcha.toUpperCase()) {
            res.status(200).json({ success: true, message: '验证码验证成功' });
        } else {
            res.status(400).json({ success: false, message: '验证码验证失败' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '验证码验证过程中发生错误' });
    }
});
// 处理前端发起拿到公钥的请求
router.get('/getKey', (req, res) => {
    // console.log(publicKey)
    res.status(200).json({ success: true, data: publicKey, message: '获取公钥成功' })

})
// 处理注册请求的路由
router.post('/signup', async (req, res) => {
    try {
        // 从请求体中获取用户名和密码
        const { username, password, initInfo, salt } = req.body;
        // 获取注册结果
        const result = await handleUser.handleUserSignup(username, password, initInfo, salt);
        // 返回处理结果给前端
        res.status(200).json(result);
        console.log(result)
    } catch (error) {
        console.error("处理注册请求时出错:", error);
        res.status(500).json({ error: '注册失败，请稍后重试' });
    }
});
// 处理登录请求的路由
router.post('/login', async (req, res) => {
    try {
        // 从请求体中获取用户名和密码
        const { username, password,captcha} = req.body;
        const result = await handleUser.handleUserLogin(req, username, password,captcha);
        // 返回处理结果给前端
        res.status(200).json(result);
        console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ error: '登录失败' });
    }
});
router.post('/forget', async (req, res) => {
    try {
        // 从请求体中获取用户名和密码
        const { username } = req.body;
        const result = await handleUser.handleForget(username);
        // 返回处理结果给前端
        res.status(200).json(result);
        console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ error: '登录失败' });
    }
});

// 导出路由
module.exports = router;
