import Vue from 'vue';
//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/base.css';
Vue.use(ElementUI);

//导入自己抽取的axios的插件
import VueAxios from './lib/vue-axios';
Vue.use(VueAxios);

//导入自己抽取的router
import router from './lib/router';

//导入自己的面包屑
import breadcrumb from './components/breadcrumb .vue';
//注册全局面包屑组件
Vue.component('breadcrumb',breadcrumb);

// 导入moment.js
import moment from 'moment';

//导入过滤器
Vue.filter('beautifyTime',(value)=>{
  // moment.js格式化
  return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
})

new Vue({
  el: '#app',
  //挂载到 Vue实例上
  router,
  render: h => h(App)
});
