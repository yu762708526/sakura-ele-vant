export default {
  totalCount (state) {
    return state.cartGoods.reduce((total, food) => total + food.count, 0)
  },
  totalPrice (state) {
    return state.cartGoods.reduce((total, food) => total + food.count * food.price, 0)
  }
}
