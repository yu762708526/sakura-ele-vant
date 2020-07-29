<template>
  <div class="order">
    <!-- 头部 -->
    <div class="order_header">
      <van-nav-bar>
        <template #title>
          订单列表
        </template>
      </van-nav-bar>
    </div>
    <!-- 身体 -->
    <div class="order_body">
      <div class="img">
        <img class="imgItem" src="./images/person.png" alt="">
      </div>
      <div class="text">
        登录后查看外卖订单
      </div>
      <div class="btn">
        立即登录
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
.order
  .order_body
    width 60%
    padding-top 100px
    margin 0 auto
    text-align center
    .img
      height 0
      padding-bottom 100%
      .imgItem
        display block
        width 100%
    .text
      font-size 17px
      padding-top 10px
      color #6A6A6A
    .btn
      margin 10px auto 0
      font-size 16px
      padding 8px 10px
      background-color $green
      width 80px
      border-radius 5px
      color $color_fff
</style>
