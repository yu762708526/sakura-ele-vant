<template>
  <div class="home">
    <!-- 头部 -->
    <div class="home_header">
      <van-nav-bar fixed z-index="100">
        <template #right>
          登录|注册
        </template>
        <template #left>
          <span class="iconfont iconsearch"></span>
        </template>
        <template #title>
          {{address.name}}
        </template>
      </van-nav-bar>
    </div>
    <div class="scroll" ref="scroll">
      <div class="scroll_content">
        <!-- 轮播 -->
        <div class="swiper">
          <van-swipe :duration="200" loop class="my-swipe" sindicator-color="#fff" v-if="showSwiper">
            <van-swipe-item v-for="(items, index) in foodstypeArr" :key="index">
              <van-grid :border="false">
                <van-grid-item v-for="(item, index) in items" :key="index" :icon="baseUrl+item.image_url"
                  :text="item.title">
                </van-grid-item>
              </van-grid>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 附近商家 -->
        <div class="tab">
          <div class="iconfont iconcategory"></div>
          <div class="tab_text">附近商家</div>
        </div>
        <!-- 商家列表 -->
        <div class="shopList">
          <ul>
            <router-link :to="{path:'/shop',query:{id:shops.id}}" tag="li" class="shopList_item van-hairline--bottom"
              v-for="(shops, index) in shopList" :key="index">
              <div class="left_img">
                <img src="./4.jpg" alt="">
              </div>
              <div class="right_content">
                <div class="left_desc">
                  <div class="desc_title">
                    <div class="title_tag">
                      <van-tag color="#FFD930" text-color="#333333" class="tagFont">品牌</van-tag>
                    </div>
                    <div class="title_text">{{shops.name}}</div>
                  </div>
                  <div class="desc_star">
                    <div class="star">
                      <van-rate :allow-half="true" v-model="shops.rating" :size="18" color="#F5A100" void-icon="star"
                        void-color="#eee" class="star_font" />
                    </div>
                    <div class="star_score"><span>{{shops.rating}}</span></div>
                    <div class="star_text">月售{{shops.recent_order_num}}单</div>
                  </div>
                  <div class="desc_price">￥{{shops.float_minimum_order_amount}}起送/配送费约￥{{shops.float_delivery_fee}}
                  </div>
                </div>
                <div class="right_tag">
                  <div class="tag_ticket">
                    <span class="ticket_text van-hairline--surround">保</span>
                    <span class="ticket_text van-hairline--surround">准</span>
                    <span class="ticket_text van-hairline--surround">票</span>
                  </div>
                  <div class="tag_send">
                    <van-tag plain type="success">蜂鸟专送</van-tag>
                  </div>
                </div>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      baseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'foodstype', 'shopList']),
    showSwiper () {
      return this.foodstype.length
    },
    foodstypeArr () {
      const { foodstype } = this
      const arr = []
      let minarr = []
      foodstype.forEach(item => {
        if (minarr.length === 0) {
          arr.push(minarr)
        }
        minarr.push(item)
        if (minarr.length === 8) {
          minarr = []
        }
      })
      return arr
    }
  },
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getFoodstype')
    this.$store.dispatch('getShopsList')
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
.home
  width 100%
  height 100%
  .scroll
    left 0
    right 0
    position fixed
    top 45px
    bottom 50px
    .scroll_content
      width 100%
      .swiper
        height 200px
        background-color $color_fff
        margin-bottom 10px
      .tab
        padding 8px 8px 0 15px
        background-color $color_fff
        display flex
        .iconfont
          font-size 30px
          height 25px
          line-height 25px
          margin-right 6px
          vertical-align middle
          color #666
        .tab_text
          font-size 14px
          height 25px
          line-height 25px
          vertical-align middle
          color #999999
      .shopList
        background-color $color_fff
        .shopList_item
          padding 15px 8px
          display flex
          .left_img
            margin-right 15px
            img
              width 75px
              height 75px
          .right_content
            flex 1
            display flex
            justify-content space-between
            .left_desc
              .desc_title
                display flex
                .title_tag
                  margin-right 5px
                  .tagFont
                    font-weight 700
                    font-size 10px
                .title_text
                  font-size 16px
                  font-weight 700
              .desc_star
                display flex
                margin 14px 0 8px
                font-size 10px
                height 16px
                line-height 16px
                .star
                  .star_font
                    vertical-align middle
                .star_score
                  color #FF7D2F
                  padding 0 5px
                  font-size 12px
                .star_text
                  font-size 10px
              .desc_price
                font-size 10px
                padding-top 4px
                color #666666
            .right_tag
              .tag_ticket
                .ticket_text
                  padding 0 2px
                  color #999999
              .tag_send
                padding-top 20px
                font-size 8px
</style>
