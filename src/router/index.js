import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/home/Home.vue'
// import Search from '../pages/search/Search.vue'
// import Order from '../pages/order/Order.vue'
// import Personal from '../pages/personal/Personal.vue'
// import Login from '../pages/login/Login.vue'
import Shop from '../pages/shop/shop.vue'
import ShopGoods from '../pages/shop/shopGoods/shopGoods.vue'
import ShopInfo from '../pages/shop/shopInfo/shopInfo.vue'
import ShopRating from '../pages/shop/shopRating/shopRating.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      show: true
    },
    component: () => import('../pages/home/Home.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      show: true
    },
    component: () => import('../pages/search/Search.vue')

  },
  {
    path: '/order',
    name: 'order',
    meta: {
      show: true
    },
    component: () => import('../pages/order/Order.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    meta: {
      show: true
    },
    component: () => import('../pages/personal/Personal.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/Login.vue')
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '/shop/rating',
        component: ShopRating
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
