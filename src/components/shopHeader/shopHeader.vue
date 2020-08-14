<template>
  <div class="shopHeader">
    <!-- t头部 -->
    <div class="header_top">
      <img class="top_img" :src="info.bgImg" alt="">
      <div class="left_back" @click="$router.back()">
        <van-icon class="arrow-left" name="arrow-left" />
      </div>
    </div>
    <!-- 身体 -->
    <div class="header_content" @click="openShopDetail">
      <div class="content_img">
        <img class="content_img_top" :src="info.avatar" alt="">
      </div>
      <div class="content_text">
        <div class="text_tag">
          <van-tag class="text_tag_content" color="#FFE52F">品牌</van-tag>
        </div>
        <div class="text_content">
          {{info.name}}
        </div>
        <div class="text_right">
          <van-icon class="text_right_content" name="play" />
        </div>
      </div>
      <div class="content_detail">
        <div class="content_detail_text">{{info.score}}</div>
        <div class="content_detail_text">月售{{info.sellCount}}单</div>
        <div class="content_detail_text">蜂鸟专送 约{{info.deliveryTime}}分钟</div>
        <div class="content_detail_text">距离{{info.distance}}</div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="header_footer" @click="toggleShowSupports" v-if="info.supports">
      <div class="left_tag">
        <van-tag class="left_tag_content" color="#70BC46">{{info.supports[0].name}}</van-tag>
      </div>
      <div class="footer_text">
        {{info.supports[0].content}}
      </div>
      <div class="footer_right">
        <span> {{info.supports.length}}个优惠 </span>
        <span class="iconfont iconjiantouarrow486"></span>
      </div>
    </div>
    <!-- 店铺详情 -->
    <transition>
      <div class="shop_detail" v-show="showDetail">
        <div class="detail_content">
          <div class="content_title">
            <van-tag class="text_tag_content" color="#FFE52F">品牌</van-tag>
            {{info.name}}
          </div>
          <div class="content_instructions">
            <ul class="ulContent">
              <li class="itemLi">
                <p class="itemLi_top">{{info.score}}</p>
                <p class="itemLi_bottom">评分</p>
              </li>
              <li class="itemLi">
                <p class="itemLi_top">{{info.sellCount}}单</p>
                <p class="itemLi_bottom">月售</p>
              </li>
              <li class="itemLi">
                <p class="itemLi_top">蜂鸟专送</p>
                <p class="itemLi_bottom">约 {{info.deliveryTime}}分钟</p>
              </li>
              <li class="itemLi">
                <p class="itemLi_top">{{info.deliveryPrice}}元</p>
                <p class="itemLi_bottom">配送费用</p>
              </li>
              <li class="itemLi">
                <p class="itemLi_top">{{info.distance}}</p>
                <p class="itemLi_bottom">距离</p>
              </li>
            </ul>
          </div>
          <div class="content_tell">
            <span class="tell_child">公告</span>
          </div>
          <div class="content_text">
            {{info.bulletin}}
          </div>
        </div>
        <van-icon class="close" name="close" @click="closeShopDetail" />
      </div>
    </transition>

    <!-- 活动优惠 -->
    <transition>
      <div class="shopsupports" v-show="showSupports">
        <div class="supports_content">
          <div class="title">优惠活动</div>
          <ul class="items">
            <li class="item" v-for="(item, index) in info.supports" :key="index">
              <van-tag :color="colorType[item.type]" class="item_tag">{{item.name}}</van-tag>
              <p class="item_text">{{item.content}}</p>
            </li>
          </ul>
          <van-icon name="cross" class="closeSupports" @click="closeSupports" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 显示隐藏商店详情
      showDetail: false,
      // 显示隐藏商店活动
      showSupports: false,
      // 活动栏标签颜色
      colorType: ['#70BC46', '#F07373', '#F1884F']
    }
  },
  computed: {
    ...mapState(['info'])
  },
  methods: {
    // 打开商店详情页
    openShopDetail () {
      this.showDetail = !this.showDetail
    },
    // 关闭商店详情页
    closeShopDetail () {
      this.showDetail = !this.showDetail
    },
    // 打开活动页
    toggleShowSupports () {
      this.showSupports = !this.showSupports
    },
    // 关闭活动页
    closeSupports () {
      this.showSupports = !this.showSupports
    }
  }

}
</script>
<style lang="stylus" scoped>
.shopHeader
  .header_top
    height 50px
    width 100%
    overflow hidden
    position relative
    .top_img
      width 100%
    &:before
      content ''
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color rgba(119, 103, 137, 0.43)
    .left_back
      position absolute
      top 50%
      left 1px
      transform translateY(-50%)
      .arrow-left
        font-size 30px
        color #fff
  .header_content
    text-align center
    position relative
    .content_img
      position absolute
      top 0
      left 50%
      transform translateX(-50%)
      margin-top -40px
      .content_img_top
        width 66px
        height 66px
        box-shadow 0 0 2px rgba(0, 0, 0, 0.3)
    .content_text
      display flex
      justify-content center
      padding-top 30px
      height 30px
      line-height 30px
      .text_tag
        .text_tag_content
          font-size 11px
          color #333333
          font-weight 700
      .text_content
        font-size 21px
        font-weight 700
        padding 0 14px 0 10px
      .text_right
        .text_right_content
          font-size 16px
          vertical-align middle
    .content_detail
      display flex
      justify-content center
      padding 5px 0 4px
      .content_detail_text
        padding-right 8 px
        font-size 11px
        color #333333
  .header_footer
    display flex
    font-size 10px
    padding 4px
    margin 0 auto
    width 100%
    border 1px solid #EEEEEE
    width 80%
    align-items center
    margin-top 3px
    justify-content center
    .left_tag
      padding-right 5px
      .left_tag_content
        font-size 9px
        color #FFFFFF
        font-weight 700
        line-height 10px
    .footer_text
      padding-right 22px
      font-size 11px
      color #666666
    .footer_right
      color #666666
      .iconjiantouarrow486
        font-size 12px
  .shop_detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, 0.5)
    z-index 100
    &.v-enter, &.v-leave-to
      opacity 0
    &.v-enter-active, &.v-leave-active
      transition all 0.5s
    .detail_content
      padding 20px 10px
      width 80%
      background-color #fff
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      .content_title
        font-size 20px
        font-weight 700
        display flex
        justify-content center
        align-items center
        .text_tag_content
          color #000000
          vertical-align middle
          margin-right 10px
      .content_instructions
        margin-top 20px
        .ulContent
          display flex
          .itemLi
            flex 1
            text-align center
            .itemLi_top
              font-size 14px
              font-weight 700
            .itemLi_bottom
              padding-top 8px
              color #999999
      .content_tell
        width 100px
        margin 0 auto
        text-align center
        background-image linear-gradient(90deg, #fff, #333, #fff)
        background-size 100% 1px
        background-repeat no-repeat
        background-position 50%
        margin-top 15px
        margin-bottom 15px
        .tell_child
          font-size 12px
          color #999
          background-color #fff
          padding 0 5px
      .content_text
        font-size 13px
        line-height 18px
        color #333333
    .close
      font-size 30px
      color #fff
      position absolute
      left 50%
      transform translateX(-50%)
      bottom 170px
  .shopsupports
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, 0.5)
    z-index 100
    &.v-enter, &.v-leave-to
      opacity 0
    &.v-enter-active, &.v-leave-active
      transition all 0.5s
    .supports_content
      padding 20px 30px
      background-color #F5F5F5
      position fixed
      left 0
      right 0
      bottom 0
      .title
        font-size 20px
        font-weight 700
        text-align center
        padding-bottom 20px
      .items
        height 170px
        width 100%
        overflow-y scroll
        .item
          display flex
          margin-bottom 12px
          align-items center
          .item_tag
            margin-right 10px
          .item_text
            font-size 12px
      .closeSupports
        font-size 30px
        font-weight 1000
        color #333333
        position absolute
        right 5px
        top 5px
</style>
