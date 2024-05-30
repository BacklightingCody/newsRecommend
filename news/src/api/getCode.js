// 验证码
import request from '@/utils/request'
export const getCaptcha = () => {
    return request.get('api/user/captcha')
}