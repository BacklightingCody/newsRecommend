const { connectToDatabase } = require('../database/db_connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const {privateKey}= require('../api/generateKey')
module.exports = {
    async getUserInfo(userId) {
        try {
            const db = await connectToDatabase();
            const userInfosCollection = db.collection('userInfo');

            const result = await userInfosCollection.findOne({ userId });
            // console.log(result)
            return { success: true, data: result, message: '个人信息同步完毕' }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getUserAvatar(userId) {
        try {
            const db = await connectToDatabase();
            const userInfosCollection = db.collection('userInfo');

            const result = await userInfosCollection.findOne({ userId });
            // console.log(result.userAvatar)
            return { success: true, data: result.userAvatar, message: '个人头像信息同步完毕' }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async updateUserInfo(userId, userInfos) {
        try {
            const db = await connectToDatabase();
            const userInfosCollection = db.collection('userInfo');

            const result = userInfosCollection.updateOne(
                { userId },
                { $set: { userInfos } }
            );
            console.log(result);
            return { success: true, message: '个人信息更新成功' };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async updateUserAvatar(userId, userAvatar) {
        try {
            const db = await connectToDatabase();
            const userInfosCollection = db.collection('userInfo');

            const result = userInfosCollection.updateOne(
                { userId },
                { $set: { userAvatar } }
            );
            // console.log(result);
            return { success: true, message: '个人头像更新成功' }
        } catch (error) {
            console.error("Error:", error);
            throw error;

        }
    },
    async updateUserPassword(userId, newpassword) {
        try {
            // 对前端发送来的数据重新校验
            console.log('进入处理流程')
            // 解密
            const decryptedPassword = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING
                },
                Buffer.from(newpassword, 'base64')
            ).toString('utf-8');
            console.log('解密后的密码:', decryptedPassword);
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            // 验证新密码
            if (!passwordRegex.test(decryptedPassword)) {
                return { success: false, message: '密码格式错误' }
            }
            const db = await connectToDatabase()
            const userInfosCollection = db.collection('userData')
            const user = await userInfosCollection.findOne({ userId });
            // 验证新密码是否与旧密码相等
            const passwordMatch = await bcrypt.compare(decryptedPassword, user.password);
            if (passwordMatch) {
                // 如果密码匹配，返回错误消息给前端
                console.log('与原先密码相同')
                return { success: false, message: '不能使用和原先相同的密码' }
            }
            // 对解密的密码哈希化
            const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
            const result = await userInfosCollection.updateOne(
                { userId },
                { $set: { password: hashedPassword } }
            );
            // console.log(result);
            return { success: true, message: '个人密码更新成功，请重新登录' }

        } catch (error) {
            console.error("Error:", error);
            throw error;

        }
    }
}


// 思路
// 通过登录时的token会发送到浏览器，然后通过浏览器解析token来发送userId进行