import { RECEIVE_ADDRESS, RECEIVE_FOODSTYPE, RECEIVE_SHOPLIST, RECEIVE_USERINFO, RECEIVE_GETOUT, RECEIVE_GETSHOPGOODS, RECEIVE_GETSHOPINFO, RECEIVE_GETSHOPRATING } from './mutations_types'
import { reqAddress, reqFoodsType, reqShopsList, reqLogout, reqShopGoods, reqShopInfo, reqShopRating } from '../api/index'
export default {
  async getAddress ({ commit, state }) { // 根据经纬度获取位置详情
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getFoodstype ({ commit }) { // 获取食品分类列表
    const result = await reqFoodsType()
    if (result.code === 0) {
      const foodstype = result.data
      commit(RECEIVE_FOODSTYPE, { foodstype })
    }
  },
  async getShopsList ({ commit, state }) { // 根据经纬度获取商铺列表
    const { latitude, longitude } = state
    const result = await reqShopsList(latitude, longitude)
    if (result.code === 0) {
      const shopList = result.data
      commit(RECEIVE_SHOPLIST, { shopList })
    }
  },
  getUserInfo ({ commit }, userInfo) { // 同步获取用户登陆信息
    commit(RECEIVE_USERINFO, { userInfo })
  },
  async outLogin ({ commit }) { // 登出
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RECEIVE_GETOUT)
    }
  },
  async getShopInfo ({ commit }) { // 商家信息
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_GETSHOPINFO, { info })
    }
  },
  async getShopGoods ({ commit }, callback) { // 商家信息
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GETSHOPGOODS, { goods })
      callback && callback()
    }
  },
  async getShopRating ({ commit }) { // 商家评价
    const result = await reqShopRating()
    if (result.code === 0) {
      const rating = result.data
      commit(RECEIVE_GETSHOPRATING, { rating })
    }
  }
}
