<template>
  <div class="shopGoods">
    <!-- 左侧导航列表 -->
    <div class="left" ref="left">
      <ul class="left_ul">
        <li class="content_li" v-for="(good, index) in goods" :key="index" :class="{on:currentIndex === index}"
          @click="toggleLeftItem(index)" ref="content_li">
          <img class="icon" :src="good.icon" alt="" v-if="good.icon">
          {{good.name}}
        </li>
      </ul>
    </div>
    <!-- 右侧内容列表 -->
    <div class="right">
      <ul>
        <li class="parent_li" v-for="(items, index) in goods" :key="index" ref="parent_li">
          <div class="title">{{items.name}}</div>
          <ul>
            <li class="child_li van-hairline--bottom" v-for="(item, index) in items.foods" :key="index">
              <div class="item_img">
                <img class="img" :src="item.icon" alt="">
              </div>
              <div class="item_content">
                <div class="item_content_title">{{item.name}}</div>
                <div class="item_content_name">{{item.description}}</div>
                <div class="item_content_count">月售 {{item.sellCount}} 份 &nbsp;好评率 {{item.rating}}%</div>
                <div class="item_content_price">￥{{item.price}}</div>
              </div>
              <shop-count></shop-count>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-footer></shop-footer>
  </div>
</template>
<script>
import shopCount from '../../../components/shopCount/shopCount'
import shopFooter from '../../../components/shopFooter/shopfooter'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  components: {
    shopFooter,
    shopCount
  },
  computed: {
    ...mapState(['goods']),
    currentIndex () {
      const { tops, scrollY } = this
      const index = tops.findIndex((item, index) => {
        return scrollY >= tops[index] && scrollY < tops[index + 1]
      })
      return index
    }
  },
  data () {
    return {
      // 默认index
      // currentIndex: 0,
      // 右边分类的top
      tops: [],
      // 某一个分类的高度
      scrollY: 0,
      // 侧边栏滑动默认值
      touchstatus: false
    }
  },
  methods: {

    // handleTouchstart () {
    //   this.touchstatus = true
    // },
    // handleTouchmove (e) {
    //   const { tops } = this
    //   if (this.touchstatus) {
    //     const leftTop = this.$refs.left.offsetTop
    //     const touchTop = e.touches[0].clientY - 393
    //     const index = Math.floor((touchTop - leftTop) / 110.05)
    //     this.scroll.scrollTo(0, -tops[index], 300)
    //   }
    // },
    // handleTouchend () {
    //   this.touchstatus = false
    // },
    // 点击左侧li的时候显示高亮
    toggleLeftItem (index) {
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      this.scroll.scrollTo(0, -scrollY, 300)
    },
    // 右边每一个商品分类的高度
    foodsTypeTop () {
      const tops = []
      let top = 0
      tops.push(top)
      const typeLi = this.$refs.parent_li
      Array.prototype.slice.call(typeLi).forEach((item) => {
        top += item.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    }
    // 初始化scroll
  },
  mounted () {
    // 数据更新之后再滑动
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        this.scroll = new BScroll('.right', { // 右边滑动
          click: true,
          probeType: 2
        })
        this.scrollMenu = new BScroll('.left', { // 左边滑动
          click: true
        })
        this.scroll.on('scroll', ({ x, y }) => {
          const scrollY = Math.abs(y)
          this.scrollY = scrollY
          console.log(0, y)
        })
        this.scroll.on('scrollEnd', ({ x, y }) => {
          const scrollY = Math.abs(y)
          this.scrollY = scrollY
          console.log('scrollEnd', y)
        })
        // 右边每一个商品分类的高度
        this.foodsTypeTop()
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.shopGoods
  position fixed
  bottom 48px
  left 0
  right 0
  top 197px
  display flex
  .left
    width 80px
    height 100%
    overflow hidden
    .content_li
      height 55px
      line-height 55px
      text-align center
      display flex
      background-color #F3F5F7
      color #3D3D3E
      align-items center
      justify-content center
      bottom-border-1px(rgba(0, 0, 0, 0.08))
      .icon
        display inline-block
        width 12px
        height 12px
        margin-right 5px
      &.on
        background-color #fff
        color #25B387
        position relative
        top -1px
  .right
    flex 1
    width 100%
    overflow hidden
    .parent_li
      .title
        height 26px
        background-color #F3F5F7
        padding-left 15px
        color #93999F
        line-height 26px
      .child_li
        display flex
        margin 20px
        padding-bottom 20px
        &:last-child
          margin-bottom 0
        .item_img
          .img
            display inline-block
            width 57px
            height 57px
        .item_content
          flex 1
          margin-left 10px
          .item_content_title
            font-size 14px
            margin-bottom 8px
          .item_content_name
            margin-bottom 8px
            color #93999F
            font-size 10px
          .item_content_count
            color #93999F
            margin-bottom 5px
            font-size 10px
          .item_content_price
            color #F01414
            font-size 14px
</style>
