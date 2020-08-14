<template>
  <div class="add">
    <transition>
      <div class="iconfont iconyichu" @click.stop="updataCartCount(false)" v-if="food.count"></div>
    </transition>
    <div class="num" v-if="food.count">{{ food.count}}</div>
    <div class="iconfont iconjiahao" @click.stop="updataCartCount(true)"></div>
  </div>
</template>
<script>
export default {
  props: ['food'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    updataCartCount (isAdd) {
      this.$store.dispatch('updataCartCount', { isAdd, food: this.food })
    }
  }

}
</script>
<style lang="stylus" scoped>
.add
  display flex
  position absolute
  bottom 12px
  right 6px
  align-items center
  .num
    display inline-block
    padding 0 8px
  .iconyichu
    color #02A774
    font-size 25px
    font-weight 700
    &.v-enter, &.v-leave-to
      opacity 0
      transform translateX(18px) rotate(180deg)
    &.v-enter-active, &.v-leave-active
      transition all 0.5s
  .iconjiahao
    color #02A774
    font-size 25px
    font-weight 700
</style>
