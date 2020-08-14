<template>
  <div class="goodsDetail">
    <div class="goodsDetail_content">
      <div class="content_img">
        <img class="img" v-lazy="food.image" alt="">
        <div class="bgimg_text">{{food.info}}</div>
        <van-icon class="img_icon" name="arrow-left" @click="back" />
      </div>
      <div class="goods_name">
        <div class="name_text">{{food.name}}</div>
        <div class="name_count">
          <div class="count">月售{{food.sellCount}}份</div>
          <div class="rating">好评率{{food.rating}}%</div>
        </div>
      </div>
      <div class="content_price">
        <div class="left_price">￥{{food.price}}</div>
        <div class="right_count">
          <Count :food="food"></Count>
        </div>
      </div>
    </div>
    <div class="shadow" @click="back"></div>
  </div>
</template>
<script>
import Count from '../shopCount/shopCount'
export default {
  props: ['food'],
  components: {
    Count
  },
  methods: {
    // 隐藏商品详情
    back () {
      this.$emit('toggleDetail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.goodsDetail
  .goodsDetail_content
    z-index 100
    width 80%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color #FFFFFF
    height 60%
    .content_img
      position relative
      height 75%
      .img
        width 100%
        height 100%
      .bgimg_text
        position absolute
        bottom 10px
        left 10px
        font-size 10px
        color #D9D8D8
      .img_icon
        color #fff
        position absolute
        left 0px
        top 0px
        font-size 28px
        padding-top 14px
        padding-left 6px
    .goods_name
      margin-left 20px
      margin-top 16px
      .name_text
        font-size 14px
        font-weight 700
      .name_count
        display flex
        margin-top 8px
        .count
          font-size 10px
          margin-right 10px
          color #93999F
        .rating
          color #93999F
          font-size 10px
    .content_price
      display flex
      justify-content space-between
      .left_price
        font-size 14px
        color #F01414
        position absolute
        left 20px
        bottom 15px
      .right_count
        position absolute
        right 15px
        bottom -5px
  .shadow
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, 0.5)
</style>
