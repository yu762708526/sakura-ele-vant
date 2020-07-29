<template>
  <div class="shop">
    <shop-header></shop-header>
    <div class="tab van-hairline--bottom">
      <router-link :to="{path:'/shop/goods',query:{id:this.$route.query.id}}" tag="div" replace class="tab_class">点餐
      </router-link>
      <router-link :to="{path:'/shop/info',query:{id:this.$route.query.id}}" tag="div" replace class="tab_class">评价
      </router-link>
      <router-link :to="{path:'/shop/rating',query:{id:this.$route.query.id}}" tag="div" replace class="tab_class">商家
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import ShopHeader from '../../components/shopHeader/shopHeader'
export default {
  components: {
    ShopHeader
  },
  data () {
    return {

    }
  },
  mounted () {
    this.$store.dispatch('getShopInfo')
  }
}
</script>
<style lang="stylus" scoped>
.shop
  height 100%
  background-color #fff
  .tab
    display flex
    align-items center
    height 40px
    text-align center
    .tab_class
      flex 1
      font-size 14px
      line-height 40px
      position relative
      &.router-link-active
        color #02A774
        &::after
          content ''
          position absolute
          left 50%
          bottom 2px
          width 35px
          height 2px
          transform translateX(-50%)
          background-color #02A774
</style>
