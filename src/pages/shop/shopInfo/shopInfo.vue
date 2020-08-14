<template>
  <div class="shopInfo" ref="shopInfo">
    <div class="scroll_content">
      <!-- 商家信息 -->
      <div class="info_text">
        <div class="info_text_title">配送信息</div>
        <div class="info_text_detail">
          <span class="detail_tag">蜂鸟专送</span>
          <span class="detail_text">由商家配送提供配送，约28分钟送达，距离1000m</span>
        </div>
        <div class="info_text_price">配送费￥4</div>
      </div>
      <!-- 分界线 -->
      <div class="line"></div>
      <!--活动与服务  -->
      <div class="supports">
        <div class="supports_title">活动与服务</div>
        <ul>
          <li class="supports_item" v-for="(item, index) in info.supports" :key="index">
            <div class="item_tag">
              <van-tag class="tag" :color="colorType[item.type]">{{item.name}}</van-tag>
            </div>
            <div class="item_text">{{item.content}}</div>
          </li>
        </ul>
      </div>
      <!-- 分界线 -->
      <div class="line"></div>
      <!-- 图片区域 -->
      <div class="shop_img">
        <div class="img_title">商家实景</div>
        <div class="scroll_img" ref="scroll_img">
          <ul class="img_ul" ref="img_ul">
            <li class="img_li" v-for="(item, index) in info.pics" :key="index" ref="img_li">
              <img class="img" :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
      <!-- 分界线 -->
      <div class="line"></div>
      <!-- 底部 -->
      <div class="footer">
        <div class="footer_title">商家信息</div>
        <ul class="detail">
          <li class="detail_li van-hairline--bottom"><span class="bold">品类</span> <span class="right">包子粥店, 简餐</span>
          </li>
          <li class="detail_li van-hairline--bottom"><span class="bold">商家电话</span> <span
              class="right">18501083744</span></li>
          <li class="detail_li van-hairline--bottom"><span class="bold">地址</span> <span
              class="right">北京市丰台区太平桥44号</span></li>
          <li class="detail_li van-hairline--bottom"><span class="bold">营业时间</span> <span
              class="right">09:35-24:00</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['info'])
  },
  data () {
    return {
      colorType: ['#70BC46', '#F07373', '#F1884F']
    }
  },
  watch: {
    info () {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  },
  mounted () {
    if (this.info.pics) {
      this._initScroll()
    }
  },
  methods: {
    _initScroll () {
      this.scrollY = new BScroll(this.$refs.shopInfo, {
        click: true
      })
      // const ul = this.$refs.img_ul
      // const imgWidth = 120
      // const space = 6
      // const count = this.info.pics.length
      const Ulwidth = this.totalWidth()
      this.$refs.img_ul.style.width = Ulwidth + 'px'
      this.scrollX = new BScroll('.scroll_img', {
        click: true,
        scrollX: true
      })
    },
    totalWidth () {
      const Li = this.$refs.img_li
      let sum = 0
      for (let i = 0; i < this.info.pics.length; i++) {
        sum += Li[i].offsetWidth
      }
      return sum
    }
  }
}
</script>
<style lang="stylus" scoped>
.shopInfo
  position absolute
  top 196px
  left 0
  right 0
  bottom 0
  width 100%
  overflow hidden
  .line
    width 100%
    height 16px
    border-top 1px solid #DBDEE1
    border-bottom 1px solid #DBDEE1
    background-color #F3F5F7
  .info_text
    padding 16px 14px 16px
    font-size 16px
    .info_text_title
      font-size 16px
      font-weight 700
      margin-bottom 16px
    .info_text_detail
      margin-top 16px
      line-height 18px
      margin-bottom 6px
      .detail_tag
        font-size 11px
        padding 3px 5px
        background-color #0097FF
        color #fff
        border-radius 5px
        margin-right 10px
      .detail_text
        font-size 13px
        color #666666
    .info_text_price
      font-size 13px
  .supports
    padding 16px 14px
    .supports_title
      font-size 16px
      font-weight 700
      margin-bottom 16px
    .supports_item
      margin-bottom 12px
      display flex
      align-items center
      .item_tag
        margin-right 10px
        .tag
          font-size 12px
      .item_text
        color #666666
        font-size 13px
  .shop_img
    padding 16px 14px 14px
    .img_title
      font-size 16px
      font-weight 700
      margin-bottom 16px
    .scroll_img
      overflow hidden
      margin-top 16px
      width 100%
      .img_ul
        display flex
        .img_li
          padding-right 6px
          &:last-child
            padding 0
          .img
            width 120px
            height 90px
  .footer
    padding 16px 14px 14px
    .footer_title
      font-size 16px
      font-weight 700
    .detail
      .detail_li
        display flex
        justify-content space-between
        padding-bottom 18px
        padding-top 18px
        .bold
          font-size 13px
          font-weight 700
        .right
          font-size 13px
          color #787878
</style>
