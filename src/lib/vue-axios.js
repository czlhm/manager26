//导入axios
import axios from "axios";
//按需引入
import {
    Message
} from "element-ui";
//设置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

//设置axios 响应拦截器
axios.interceptors.request.use(config => {
    //判断请求的是登录还是其他的url得知
    if (config.url.indexOf('/login') != -1) {
        //登录接口
    } else {
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    //返回处理过的axios设置
    return config;
}, error => {
    // 出错了
    return Promise.reject(error);
});

//axios 响应拦截器 请求回来就会触发
axios.interceptors.response.use(response => {
    //根据响应的状态 统一用户提示
    if (response.data.meta.status === 200) {
        //成功 提示返回信息
        Message.success(response.data.meta.msg);
    } else if (response.data.meta.status === 400) {
        //失败 提示返回信息
        Message.error(response.data.meta.msg);
    }
    // 返回处理过的axios设置
    return response;
}, error => {
    //出错了
    return Promise.reject(error);
});
//暴露出去(Vue插件)
export default {
    install(Vue) {
        //添加实例方法
        Vue.prototype.$axios = axios;
    }
}