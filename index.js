import axios from 'axios'

const defaultConfig = {
    adapter: null, // 适配器
    // 请求拦截器成功事件
    request_success: config => {
        return config;
    },
    // 请求拦截器失败事件
    request_failed: error => {
        return Promise.reject(error);
    },
    // 响应拦截器成功事件
    response_success: response => {
        return response.data;
    },
    // 响应拦截器失败事件
    response_failed: error => {
        return Promise.reject(error.response);
    }
}

export default class Request {
    /**
     * 构造异步请求
     * @param customConfig // 当前类相关配置
     * @param axiosOpts // axios 相关配置
     * @returns {AxiosInstance}
     */
    constructor(customConfig, axiosOpts = {}) {
        const config = Object.assign({}, defaultConfig, customConfig)
        const request = axios.create(axiosOpts)
        // 加载特定适配器
        if (config.hasOwnProperty("adapter") && config.adapter !== null) {
            request.defaults.adapter = config.adapter
        }

        request.interceptors.request.use(config.request_success, config.request_failed);
        request.interceptors.response.use(config.response_success, config.response_failed);

        request.all = axios.all; // 多请求同时处理方法
        request.spread = axios.spread;

        return request
    }
}


