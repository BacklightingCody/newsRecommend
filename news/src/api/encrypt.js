
import JSEncrypt from 'jsencrypt'
import request from '@/utils/request'
async function getPublicKey() {
    try {
        const response = await request.get('/api/user/getKey')

        // if (response.data.success) {
        //     ElMessage.success(response.data.message)
        // }
        return response.data.data;
    } catch (error) {
        console.error('获取公钥失败:', error);
        throw new Error('无法获取公钥');
    }
}
export async function encryptPassword(password) {
    const publicKey = await getPublicKey();
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    // console.log('使用的公钥:', publicKey); // 调试信息

    const encryptedPassword = encrypt.encrypt(password);
    if (!encryptedPassword) {
        console.error('加密失败');
        throw new Error('加密失败');
    }
    // console.log(encryptedPassword)
    return encryptedPassword;

}