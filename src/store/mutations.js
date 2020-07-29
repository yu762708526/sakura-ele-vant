import Vue from 'vue'
import {
  RECEIVE_ADDRESS, RECEIVE_FOODSTYPE, RECEIVE_SHOPLIST, RECEIVE_USERINFO, RECEIVE_GETOUT,
  RECEIVE_GETSHOPGOODS, RECEIVE_GETSHOPINFO, RECEIVE_GETSHOPRATING, INCRESE_COUNT, DECRESE_COUNT
} from './mutations_types'
export default {
  [RECEIVE_ADDRESS] (state, { address }) { // 根据经纬度获取位置详情
    state.address = address
  },
  [RECEIVE_FOODSTYPE] (state, { foodstype }) { // 获取食品分类列表
    state.foodstype = foodstype
  },
  [RECEIVE_SHOPLIST] (state, { shopList }) { // 根据经纬度获取商铺列表
    state.shopList = shopList
  },
  [RECEIVE_USERINFO] (state, { userInfo }) { // 获取用户登陆信息
    state.userInfo = userInfo
  },
  [RECEIVE_GETOUT] (state) { // 用户登出
    state.userInfo = {}
  },
  [RECEIVE_GETSHOPINFO] (state, { info }) { // 商家信息
    state.info = info
  },
  [RECEIVE_GETSHOPGOODS] (state, { goods }) { // 商品信息
    state.goods = goods
  },
  [RECEIVE_GETSHOPRATING] (state, { rating }) { // 商品信息
    state.rating = rating
  },
  [INCRESE_COUNT] (state, { food }) { // 增加商品
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartGoods.push(food)
    } else {
      food.count++
    }
  },
  [DECRESE_COUNT] (state, { food }) { // 减少商品
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartGoods.splice(state.cartGoods.indexOf(food), 1)
      }
    }
  }
}
