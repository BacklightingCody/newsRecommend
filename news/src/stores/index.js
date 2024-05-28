import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
export const useStore = defineStore('main', () => {
    const userAccount = ref({ userid: "", loggedIn: false, accessToken: '' })
    const expireTime = ref(0)
    const theme = ref(null)
    const login = () => {
        userAccount.value.loggedIn = true;
    }
    // 设置
    const setUserAccesstoken = (value) => {
        userAccount.value.accessToken = value;
        console.log(value)

    }
    const setUserId = (value) => {
        userAccount.value.userid = value
    }
    const setExpireTime = (end) => {
        expireTime.value = end
    }
    // 检验
    const isExpire = () => {
        const now = Date.now()
        return now > expireTime.value ? true : false
    }
    // 退出
    const logout = () => {
        userAccount.value = { userid: "", loggedIn: false, accessToken: '' };
        localStorage.setItem('user','')
        console.log("退出登录成功")
    }
    return {
        userAccount,
        theme,
        login,
        expireTime,
        setUserId,
        setUserAccesstoken,
        setExpireTime,
        isExpire,
        logout
    }
},
    {
        persist: {
            enabled: true,
            
        }
    }
)
export * from './user'
