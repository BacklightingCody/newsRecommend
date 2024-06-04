// 处理用户请求路由
const { connectToDatabase } = require('../database/db_connection');
// 连接到数据库
const bcrypt = require('bcrypt');
const { generateResetToken } = require('../utils/generateToken');
const { generateUniqueId } = require('../utils/generateUniqueId');
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config');
const { privateKey } = require('../api/generateKey')
const { updateIpAttempts } = require('../api/updateIpCount')
const crypto = require('crypto')
module.exports = {
    async handleUserSignup(username, password, userInfos) {
        try {
            // 检查用户名或者密码是否为空
            if (!(username && password)) {
                return { success: false, error: '用户名或密码不得为空' }
            }
            // 解密
            const decryptedPassword = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING
                    // padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    // oaepHash: 'sha256'
                },
                Buffer.from(password, 'base64')
            ).toString('utf-8');
            // console.log('加密的密码',password)
            // console.log('解密后的密码:', decryptedPassword);
            // 对解密的密码哈希化
            const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
            const db = await connectToDatabase();
            // 关于验证表单方面，可以使用三方模块来进行以后的优化
            // 例如hapi/joi,escook/express-joi
            // 检查是否存在该用户名
            const existingUser = await db.collection('userData').findOne({ username });
            if (existingUser) {
                return { success: false, error: '用户名已存在，请选择其他用户名' }
            }
            // 产生唯一ID
            const userId = generateUniqueId();
            // 对ID进行操作
            await db.collection('userData').insertOne({ username, password: hashedPassword, userId });
            await db.collection('userInfo').insertOne({ userId, userInfos });
            return { success: true, message: '用户注册成功,即将跳转到登录页面', Id: userId };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async handleUserLogin(req, username, password, captcha) {
        try {
            const now = new Date()
            // 通过获取当前时间来判断用户是否处于可登录的时间段
            const curretHour = new Date().getHours()
            // console.log(curretHour)
            if (+curretHour >= 22 || curretHour <= 6) {
                // console.log(1)
                return { success: false, error: '该时间段不允许登录' }
            }
            // 配置
            const MAX_ATTEMPTS = 5;
            const FREEZE_TIME = 30 * 60 * 1000; // 30分钟
            const IP_MAX_ATTEMPTS = 10;
            const IP_FREEZE_TIME = 2 * 60 * 60 * 1000; // 2小时
            // 从此处开始连接数据库
            const db = await connectToDatabase();
            // 先检查是否是黑名单IP,如果在，并且在冻结时间内则返回错误信息，否则即时过了冻结时间解冻
            const loginIp = req.ip
            const ipRecord = await db.collection('IPBlackList').findOne({ ipAddress: loginIp });
            if (ipRecord) {
                if (ipRecord.frozenUntil && now < ipRecord.frozenUntil) {
                    return { success: false, error: '登录失败：该IP地址已被冻结，请稍后再试' };
                } else if (ipRecord.frozenUntil && now >= ipRecord.frozenUntil) {
                    // 重置IP冻结状态
                    await db.collection('IPBlackList').updateOne(
                        { ipAddress: loginIp },
                        { $set: { frozenUntil: null, attempts: 0 } }
                    );
                }
            }
            // 先检查是否填写完整
            if (!(username && password && captcha)) {
                return { success: false, error: '当前表单未填写完整' }
            }
            // console.log(captcha, 2)
            // console.log(req.session.captcha, 33)
            // 检查验证码是否正确
            if (!req.session.captcha || req.session.captcha !== captcha.toLowerCase()) {
                return { success: false, error: '验证码错误' };
            }
            // 检查是否存在该用户名
            const user = await db.collection('userData').findOne({ username });
            console.log(user)
            if (!user) {
                // 如果未找到用户，返回错误消息给前端
                return { success: false, error: '当前用户名不存在' }
            }
            // 检查用户是否被冻结

            if (user.frozenUntil && now < user.frozenUntil) {
                return { success: false, error: '登录失败：账户已被冻结，请稍后再试' };
            }
            // 解密
            const decryptedPassword = await crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING
                    // padding: crypto.constants.RSA_OAEP_PADDING,
                    // oaepHash: 'sha256' // Specify the hash function used in OAEP padding

                },
                Buffer.from(password, 'base64')
            ).toString('utf-8');
            // console.log('加密的密码',password)
            // console.log('解密后的密码:', decryptedPassword);
            // 使用 bcrypt 模块验证密码
            const passwordMatch = await bcrypt.compare(decryptedPassword, user.password);
            if (!passwordMatch) {
                // 如果密码不匹配，返回错误消息给前端
                // 密码不匹配时增加尝试次数
                const newAttempts = (user.loginAttempts || 0) + 1;
                let updateFields = { loginAttempts: newAttempts };

                if (newAttempts >= MAX_ATTEMPTS) {
                    updateFields.frozenUntil = new Date(Date.now() + FREEZE_TIME);
                }

                await db.collection('userData').updateOne(
                    { username },
                    { $set: updateFields }
                );
                await updateIpAttempts(db, loginIp, IP_MAX_ATTEMPTS, IP_FREEZE_TIME, now);
                if (newAttempts >= MAX_ATTEMPTS) {
                    return { success: false, error: '密码错误次数过多，账户已被冻结30分钟' };
                } else {
                    return { success: false, error: `用户名或密码错误，您还有${MAX_ATTEMPTS - newAttempts}次尝试机会` };
                }
            }

            // 验证通过会进行此处下面的代码
            // 重置次数
            await updateIpAttempts(db, loginIp, IP_MAX_ATTEMPTS, IP_FREEZE_TIME, now);
            // 获取上一次登录信息
            const lastLoginTime = user.lastLoginTime || null;
            const lastLoginIp = user.lastLoginIp || null;
            const lastLoginBrowser = user.lastLoginBrowser || null;

            // 获取当前登录信息
            const currentLoginTime = new Date();
            const currentLoginIp = req.ip;
            const currentLoginBrowser = req.headers['user-agent'];

            // 更新用户的登录信息
            await db.collection('userData').updateOne(
                { username },
                {
                    $set: {
                        lastLoginTime: currentLoginTime,
                        lastLoginIp: currentLoginIp,
                        lastLoginBrowser: currentLoginBrowser,
                        loginAttempts: 0,
                        frozenUntil: null
                    }
                }
            );

            const userId = user.userId;
            // 通过用户名和用户id生成token
            const userKey = { username, userId };
            const tokenStr = jwt.sign(userKey, jwtConfig.jwtSecretKey, { expiresIn: jwtConfig.expiresIn });
            return {
                success: true, message: '登录成功', data: {
                    token: 'Bearer ' + tokenStr, userId, expireTime: jwtConfig.expiresIn,
                    currentLoginTime,
                    currentLoginIp,
                    currentLoginBrowser,
                    lastLoginTime,
                    lastLoginIp,
                    lastLoginBrowser
                }
            };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async handleForget(username) {
        try {
            const db = await connectToDatabase();
            // 先检查是否填写完整

            // 检查是否存在该用户名
            const user = await db.collection('userData').findOne({ username });
            if (!user) {
                // 如果未找到用户，返回错误消息给前端
                return { success: false, error: '当前用户名不存在' }
            }
            // const resetToken = generateResetToken();
            // user.resetPasswordToken = resetToken;
            // user.resetPasswordExpires = Date.now() + 3600000; // 令牌有效期为1小时
            // await db.collection('userData').updateOne({ _id: user._id }, { $set: { resetPasswordToken: resetToken, resetPasswordExpires: user.resetPasswordExpires } });
            return { success: true, message: '登录成功' };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

