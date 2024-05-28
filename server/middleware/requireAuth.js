// 路由处理程序中间件，用于验证用户权限
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config')
function requireAuth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // 从请求头中获取JWT令牌
    console.log(token)
    // 验证JWT令牌是否存在
    if (!token) {
        return res.status(401).json({ message: '未提供令牌' });
    }
    // 解析JWT令牌
    jwt.verify(token, jwtConfig.jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '无效的令牌' });
        }
        // 检查用户是否具有所需的权限，这里可以根据解析出的用户信息进行权限验证
        // if (!decoded.isAdmin) {
        //     return res.status(403).json({ message: '权限不足' });
        // }
        console.log('权限通过')
        // 如果权限验证通过，则继续执行下一个中间件或路由处理程序
        next();
    });
}
module.exports = requireAuth;