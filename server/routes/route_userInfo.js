// 用户请求路由
// 引入 Express
const express = require('express');
const handleUser = require('../handle_routes/handle_userInfo');
const bcrypt = require('bcrypt');
// 创建一个 Express 路由实例
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
router.get('/getInfo', requireAuth, async (req, res) => {
    try {
        const userId = req.query.userId;
        const result = await handleUser.getUserInfo(userId);
        // 将获取到的个人信息对象存储到数据库中
        // 返回响应给前端，通知更新操作成功
        res.status(200).json(result);
        // console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '个人信息更新失败' });
    }
}
)
router.get('/getAvatar', requireAuth, async (req, res) => {
    try {
        const userId = req.query.userId;
        const result = await handleUser.getUserAvatar(userId);
        // 将获取到的个人信息对象存储到数据库中
        // 返回响应给前端，通知更新操作成功
        res.status(200).json(result);
        // console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '个人信息更新失败' });
    }
}
)
router.post('/updateInfo', requireAuth, async (req, res) => {
    try {
        const { userId, userInfos } = req.body;
        console.log(userId, userInfos)
        const result = await handleUser.updateUserInfo(userId, userInfos);
        // 将获取到的个人信息对象存储到数据库中
        // 返回响应给前端，通知更新操作成功
        res.status(200).json(result);
        // console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '个人信息更新失败' });
    }
}
)
router.post('/updateAvatar', requireAuth, async (req, res) => {
    try {
        const userId = req.body.userId;
        const userAvatar = req.body.image.replace(/^data:image\/[a-z];base64,/, ""); // 去除Base64头部信息
        const result = await handleUser.updateUserAvatar(userId, userAvatar);
        // 将获取到的个人信息对象存储到数据库中
        // 返回响应给前端，通知更新操作成功
        res.status(200).json(result);
        // console.log(result)
    } catch (error) {
        // 如果出现错误，返回错误消息给前端
        console.error("Error:", error);
        res.status(500).json({ success: false, message: '个人头像更新失败' });
    }

})
// 修改密码
router.post('/updatePassword', requireAuth, async (req,res) => {
    try{
        console.log(req.body)
        const userId = req.body.userId
        // console.log(userId)
        const newPassword = req.body.newPassword
        // console.log(newPassword)
        const result = await handleUser.updateUserPassword(userId,newPassword)
        res.status(200).json(result)
    }catch(error) {
        console.error("Errpr:", error)
        res.status(500).json({ success: false, message: '更新密码失败' })
    }
})
// 导出路由
module.exports = router;
