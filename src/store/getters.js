export default {
  // 总数量
  totalCount (state) {
    return state.cartGoods.reduce((total, food) => total + food.count, 0)
  },
  // 总价格
  totalPrice (state) {
    return state.cartGoods.reduce((total, food) => total + food.count * food.price, 0)
  },
  // 计算满意的评价
  recommends (state) {
    return state.rating.reduce((total, item) => total + (item.rateType === 0 ? 1 : 0), 0)
  }
}
