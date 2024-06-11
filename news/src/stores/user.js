import request from '@/utils/request'
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // 用户肖像
    const UserPortrait = ref(null)
    const setUserPortrait = (value) => {
        UserPortrait.value = value
    }
    // 用户历史记录
    const articleHistory = ref([])
    const addHistory = async (article) => {
        articleHistory.value.push(article)
        try {
            // 发送请求将记录存储到数据库中
            const res = await request.post('/api/article/artHistory', { article })
            // console.log(res)
        } catch (error) {
            console.error('Failed to add article to history:', error)
        }
    }
    const loadHistory = async (userid) => {
        try {
            const response = await request.get('/api/article/getHistory', {params: { userid }})
            articleHistory.value = response.data
            return response
        } catch (error) {
            console.error('Failed to load history:', error)
        }
    }
    return {
        UserPortrait,
        setUserPortrait,
        articleHistory,
        addHistory,
        loadHistory
    }
},
    {
        persist: {
            enabled: true,

        }
    }
)