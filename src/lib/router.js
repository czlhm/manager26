//导入vue
import Vue from "vue";
//导入router
import VueRouter from "vue-router";
//注册插件
Vue.use(VueRouter);
//导入路由管理的组件
import login from '../components/login.vue';
import main from '../components/main.vue';

//写规则
let routes = [
    //登录页
    {
        path: '/login',
        component: login
    },
    //首页
    {
        path: '/',
        component: main
    }
]
//实例化对象
let router = new VueRouter({
    routes
})

//暴露出去
export default router;