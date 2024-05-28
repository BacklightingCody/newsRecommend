import request from '@/utils/request'

export const searchQuery=(keyword)=>{
    return request.get('api/article/search',{params:{keyword}})
}