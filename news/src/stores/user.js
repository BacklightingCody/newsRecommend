
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const UserPortrait = ref(null)
    const setUserPortrait = (value) => {
        UserPortrait.value = value
        
    }
    return {
        UserPortrait,
        setUserPortrait
        
    }
},
{
    persist: {
        enabled: true,
        
    }
}
)