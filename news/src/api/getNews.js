import request from '@/utils/request'

export const getSidebarNews = ()=>{
    return request.get('api/article/getnews')
}
// 即时新闻
export const getBreakNews = ()=>{
    return request.get('api/article/getBreaknews')
}
// 时政新闻
export const getPolitical =()=>{
    return request.get('api/article/shizheng')
}
// 社会新闻
export const getSociety=()=>{
    return request.get('api/article/society')
}
// 国际新闻
export const getInternational = ()=>{
    return request.get('api/article/international')
}
// 财经新闻
export const getEconomy =()=>{
    return request.get('api/article/economy')
}
// 科技新闻
export const getTechnology=()=>{
    return request.get('api/article/technology')
}
// 健康新闻

export const getHealth=()=>{
    return request.get('api/article/health')
}