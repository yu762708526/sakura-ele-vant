<template>
  <div class="dialog">
    <div class="dialog_content">
      <div class="iconfont icon47"></div>
      <div class="text">{{text}}</div>
      <div class="btn" @click="close">确认</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text'],
  methods: {
    close () {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="stylus" scoped>
.dialog
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 200
  background-color rgba(0, 0, 0, 0.5)
  .dialog_content
    width 60%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color #fff
    border-radius 5px
    .icon47
      font-size 50px
      padding-top 20px
      width 100%
      text-align center
      color #F8CB86
    .text
      padding 15px 0
      font-size 14px
      width 100%
      text-align center
    .btn
      width 100%
      height 30px
      background-color #4CD964
      text-align center
      color #fff
      font-weight 700
      font-size 18px
      line-height 30px
</style>
