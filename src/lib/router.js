//导入vue
import Vue from "vue";
//导入router
import VueRouter from "vue-router";
//注册插件
Vue.use(VueRouter);
//导入路由管理的组件
import login from '../components/login.vue';
import main from '../components/main.vue';
import users from '../components/users.vue';
import roles from '../components/roles.vue';
import rights from '../components/rights.vue';
import goods from '../components/goods.vue';
import reports from '../components/reports.vue';
import params from '../components/params.vue';
import categories from '../components/categories.vue';
import orders from '../components/orders.vue';

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
    component: main,
    children: [{
        path: 'users',
        component: users
      },
      {
        path: 'roles',
        component: roles
      },
      {
        path: 'rights',
        component: rights
      },
      {
        path: 'goods',
        component: goods
      },
      {
        path: 'reports',
        component: reports
      },
      {
        path: 'params',
        component: params
      },
      {
        path: 'categories',
        component: categories
      },
      {
        path: 'orders',
        component: orders
      }
    ]
  }
]
//实例化对象
let router = new VueRouter({
  routes
})

//注册导航守卫 (就是回到函数)
router.beforeEach((to, from, next) => {
  // ...
  // next 方法如果不执行 就不会跳转
  next();
  if (to.path === '/login') {
    // 登录页 不需要判断
    next();
  } else {
    // 判断登录 判断token是否存在即可
    let token = window.sessionStorage.getItem("token");
    if (token) {
      // 登录成功
      // 继续访问
      next();
    } else {
      // 没有token 没有登录
      // 这里不是Vue实例 无法通过this访问 但是可以访问到Vue构造函数 可以通过原型访问
      Vue.prototype.$message.error('请先登录');
      // 打会登录页 可以使用next 进行路由跳转
      next('/login');
    }
  }
})

//暴露出去
export default router;