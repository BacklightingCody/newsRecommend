// api/axios.js
import axios from 'axios';
axios.defaults.withCredentials = true
// 创建一个 Axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:8000', // 后端服务器地址
    timeout: 10000, // 请求超时时间（单位：毫秒）
    // headers: {
    //     'Content-Type': 'application/json', // 请求头中的 Content-Type
    // },
});

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // 可以在这里添加一些全局的请求处理逻辑，比如添加 token 等
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做些什么
        // 可以在这里对响应数据进行统一处理，比如处理错误信息等
        return response;
    },
    function (error) {
        // 对响应错误做些什么
        // 统一错误提示
        ElMessage.error(error.response.message)
        return Promise.reject(error);
    }
);

// 导出 Axios 实例
export default instance;
