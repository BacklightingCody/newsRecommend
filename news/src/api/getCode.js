// 验证码
import request from '@/utils/request'
export const getCode = ()=>{
    return request.get('api/user/captcha')
}