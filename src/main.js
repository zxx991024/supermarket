import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from  "components/common/toast"
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.use(toast)
// 往原型对象里添加$bus对象，以便能够实现Home.vue和GoodListItem.vue之间的通信，从而解决首页数据不能滚动的问题
Vue.prototype.$bus = new Vue()
// 解决移动端300ms延迟的问题
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/lazyload.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
