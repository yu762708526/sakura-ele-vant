<template>
  <div>
    <div class="shopfooter">
      <div class="shopfooter_count">
        <div class="leftCart">
          <div class="iconfont icongouwuche" :class="{heightLight:totalCount}"></div>
          <div class="leftCart_Tag">{{totalCount}}</div>
        </div>
        <div class="count">
          <div class="count_num">￥{{totalPrice}}</div>
          <div class="count_text">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="rightPrice" :class="countType">
          {{countText}}
        </div>
      </div>
      <div class="shopfooter_cart" v-show="showshadow">
        <div class="cleanCart">
          <div class="cartName">购物车</div>
          <div class="clean">清空</div>
        </div>
        <div class="shopList">
          <ul>
            <li class="shopList_item van-hairline--bottom">
              <div class="shopName">八宝酱菜</div>
              <div class="shopPrice">￥4</div>
              <div class="shopCount">
                <count></count>
              </div>
            </li>
            <li class="shopList_item van-hairline--bottom">
              <div class="shopName">八宝酱菜</div>
              <div class="shopPrice">￥4</div>
              <div class="shopCount">
                <count></count>
              </div>
            </li>
            <li class="shopList_item van-hairline--bottom">
              <div class="shopName">八宝酱菜</div>
              <div class="shopPrice">￥4</div>
              <div class="shopCount">
                <count></count>
              </div>
            </li>
            <li class="shopList_item van-hairline--bottom">
              <div class="shopName">八宝酱菜</div>
              <div class="shopPrice">￥4</div>
              <div class="shopCount">
                <count></count>
              </div>
            </li>
            <li class="shopList_item van-hairline--bottom">
              <div class="shopName">八宝酱菜</div>
              <div class="shopPrice">￥4</div>
              <div class="shopCount">
                <count></count>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shadow" v-if="showshadow"></div>
    </div>
  </div>

</template>
<script>
import Count from '../../components/shopCount/shopCount'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    Count
  },
  data () {
    return {
      showshadow: false
    }
  },
  computed: {
    ...mapState(['info', 'cartGoods']),
    ...mapGetters(['totalCount', 'totalPrice']),
    // 样式
    countType () {
      const { totalPrice } = this
      const { minPrice } = this.info
      if (totalPrice < minPrice) {
        return 'no_enough'
      } else {
        return 'enough'
      }
    },
    // 文字
    countText () {
      const { totalPrice } = this
      const { minPrice } = this.info
      if (totalPrice === 0) {
        return '￥20起送'
      } else if (totalPrice < minPrice) {
        return `还差${minPrice - totalPrice}起送`
      } else {
        return '去结算'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.shopfooter
  position fixed
  bottom 0
  left 0
  right 0
  height 48px
  width 100%
  background-color #141D27
  display flex
  .shopfooter_count
    display flex
    background #141d27
    z-index 110
    .leftCart
      background-color #141D27
      padding 6px
      box-sizing border-box
      border-radius 50%
      position absolute
      top -10px
      left 12px
      .icongouwuche
        width 45px
        height 45px
        background-color #2B343C
        border-radius 50%
        text-align center
        color #80858A
        line-height 48px
        font-size 25px
        &.heightLight
          background-color #02A774
          color #fff
      .leftCart_Tag
        position absolute
        right 0
        top 0
        width 25px
        height 15px
        background-color #F01414
        text-align center
        border-radius 35%
        line-height 15px
        color #fff
        font-size 10px
    .count
      .count_num
        position absolute
        left 80px
        top 8px
        color #fff
        font-size 16px
        font-weight 700
      .count_text
        color #80858A
        position absolute
        left 72px
        top 31 px
        font-size 10px
    .rightPrice
      width 105px
      height 48px
      line-height 48px
      text-align center
      color #FFFFFF
      font-size 12px
      font-weight 700
      position absolute
      top 0
      right 0
      background-color #2B333B
      &.no_enough
        background #2b333b
      &.enough
        background #00B43C
        color #FFFFFF
  .shopfooter_cart
    z-index 100
    position absolute
    top 0
    left 0
    right 0
    transform translateY(-100%)
    .cleanCart
      height 40px
      line-height 40px
      background-color #F3F5F7
      display flex
      justify-content space-between
      .cartName
        padding-left 20px
        font-size 14px
      .clean
        padding-right 20px
        color #00A0DC
    .shopList
      background-color #FFFFFF
      padding 0 18px
      max-height 217px
      overflow-y scroll
      .shopList_item
        position relative
        padding 12px 0
        display flex
        align-items center
        justify-content space-between
        .shopName
          line-height 24px
          font-size 14px
          color #07111b
        .shopPrice
          color #F01414
          position absolute
          right 90px
          font-size 14px
        .shopCount
          position absolute
          right 0
          bottom -1px
  .shadow
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 40
    backdrop-filter blur(10px)
    background rgba(7, 17, 27, 0.6)
</style>
