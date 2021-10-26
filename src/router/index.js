import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail,
    // meta:{
    //   keepAlive: true //此页面需要缓存
    // }
  },
]
const router = new VueRouter({
  routes,
  mode: 'history',
//   scrollBehavior(to,from,savePosition){
//     if(savePosition){
// //解决页面从列表页跳转到详情页返回,初始在原来位置
//
//       return savePosition
//
//     }else{
// //解决页面跳转后页面高度和前一个页面高度一样
//
//       return {x:0,y:0}
//
//     }
//
//   }
})

export default router
