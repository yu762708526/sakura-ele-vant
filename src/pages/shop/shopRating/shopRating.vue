<template>
  <div class="shopRating">
    <div>
      <!-- 商家信息 -->
      <div class="shopInfo">
        <div class="info_left">
          <div class="info_left_score">{{info.score}}</div>
          <div class="info_left_text">综合评分</div>
          <div class="info_left_detail">高于周边商家 99%</div>
        </div>
        <div class="info_right">
          <div class="info_right_attitude">
            <van-rate class="attitude_score" readonly v-model="info.serviceScore" allow-half color="#FF9900 "
              void-icon="star" void-color="#D4D6D9" />
            <span class="attitude_text">服务态度<span class="attitude_text_num">{{info.serviceScore}}</span></span>
          </div>
          <div class="info_right_shop">
            <van-rate class="shop_score" readonly v-model="info.foodScore" allow-half color="#FF9900" void-icon="star"
              void-color="#D4D6D9" />
            <span class="shop_text">商品评分<span class="shop_text_num">{{info.foodScore}}</span> </span>
          </div>
          <div class="info_right_time">
            <span class="time_text">送达时间</span>
            <span class="time_num">{{info.deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <!-- 分界线 -->
      <div class="line"></div>
      <!-- 评价分类 -->
      <div class="ratingType">
        <div class="types">
          <div class="all" :class="{on:defaultRatingType === 2}" @click="toggleRatingType(2)">全部<span
              class="all_num">{{rating.length}}</span> </div>
          <div class="yes" :class="{on:defaultRatingType === 0}" @click="toggleRatingType(0)">满意<span
              class="yes_num">{{recommends}}</span></div>
          <div class="no" :class="{on:defaultRatingType === 1}" @click="toggleRatingType(1)">不满意<span
              class="no_num">{{rating.length - recommends}}</span>
          </div>
        </div>
        <div class="text">
          <div class="text_icon">
            <van-icon name="checked" class="text_icon_style" :class="{on:showRatingText}" @click="toggleRating" />
          </div>
          <div class="text_detail">只看有内容的评价</div>
        </div>
      </div>
      <!-- 评价 -->
      <div class="ratings">
        <ul>
          <li class="ratings_Li van-hairline--bottom" v-for="(item, index) in this.ratingTypeList" :key="index">
            <div class="left_icon">
              <img class="left_icon_img" :src="item.avatar" alt="">
            </div>
            <div class="right_content">
              <div class="content_name">
                <div class="name">{{item.username}}</div>
                <div class="time">{{item.rateTime  | date-format}}</div>
              </div>
              <div class="score">
                <van-rate class="score_num" readonly v-model="item.score" allow-half color="#FF9900" void-icon="star"
                  void-color="#D4D6D9" />
                <span class="score_time">{{item.deliveryTime}}</span>
              </div>
              <span class="text">
                {{item.text}}
              </span>
              <div class="attitude">
                <div class="iconfont icondianzan" v-show="item.rateType === 0"></div>
                <div class="iconfont icontucao-tianchong" v-show="item.rateType === 1"></div>
                <div class="foodType" v-for="(recommendItem, index) in item.recommend" :key="index">{{recommendItem}}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      // 显示内容
      showRatingText: true,
      // 默认展示的评价类别(全部)
      defaultRatingType: 2
    }
  },
  computed: {
    ...mapState(['rating', 'info']),
    ...mapGetters(['recommends']),
    ratingTypeList () {
      const { showRatingText, defaultRatingType, rating } = this
      return rating.filter((item) => {
        return (defaultRatingType === 2 || item.rateType === defaultRatingType) && (!showRatingText || item.text.length > 0)
      })
    }
  },
  mounted () {
    this.$store.dispatch('getShopRating')
    this.scroll = new BScroll('.shopRating', {
      click: true
    })
  },
  methods: {
    // 切换是否显示评价内容
    toggleRating () {
      this.showRatingText = !this.showRatingText
    },
    // 切换评价分类
    toggleRatingType (ratingType) {
      this.defaultRatingType = ratingType
    }
  }
}
</script>
<style lang="stylus" scoped>
.shopRating
  position absolute
  top 194px
  left 0
  right 0
  bottom 0
  overflow hidden
  .shopInfo
    padding 20px 0
    display flex
    .info_left
      width 140px
      text-align center
      border-right 1px solid #E6E7E8
      .info_left_score
        font-size 24px
        color #FF9900
        padding 8px 0 6px 0
      .info_left_text
        color #07111B
      .info_left_detail
        color #93999F
        font-size 10px
        padding 8px 0 12px 0
    .info_right
      flex 1
      padding-left 24px
      /deep/ .van-rate__icon
        font-size 16px
      .info_right_attitude
        padding 8px 0 7px 10px
        position relative
        .attitude_score
          padding-right 10px
        .attitude_text
          font-size 12px
          position absolute
          top 10px
          .attitude_text_num
            color #FFB500
      .info_right_shop
        position relative
        padding-left 10px
        margin-bottom 10px
        .shop_score
          padding-right 10px
        .shop_text
          font-size 12px
          position absolute
          top 3px
          .shop_text_num
            color #FFB500
      .info_right_time
        .time_text
          margin-right 10px
        .time_num
          color #93999F
  .line
    height 16px
    background-color #F3F5F7
    border-top 1px solid #DBDEE1
    border-bottom 1px solid #DBDEE1
  .ratingType
    padding 18px 0 14px 18px
    border-bottom 1px solid #E6E7E8
    .types
      display flex
      margin-bottom 30px
      .all
        padding 10px
        background-color #DBDDDF
        margin-right 8px
        color #4D555D
        &.on
          background-color #02A774
          color #fff
        .all_num
          font-size 10px
          padding-left 2px
      .yes
        padding 10px
        background-color #DBDDDF
        margin-right 8px
        color #4D555D
        &.on
          background-color #02A774
          color #fff
        .yes_num
          font-size 10px
          padding-left 2px
      .no
        padding 10px
        background-color #DBDDDF
        color #4D555D
        &.on
          background-color #02A774
          color #fff
        .no_num
          font-size 10px
          padding-left 2px
    .text
      display flex
      align-items center
      .text_icon
        .text_icon_style
          font-size 24px
          vertical-align middle
          margin-right 6px
          &.on
            color #02A774
      .text_detail
        color #93999F
  .ratings
    margin 0 18px
    .ratings_Li
      padding 16px 0 18px 0
      display flex
      .left_icon
        .left_icon_img
          width 28px
          height 28px
          border-radius 50%
      .right_content
        margin-left 10px
        flex 1
        .content_name
          display flex
          justify-content space-between
          margin-bottom 5px
          .name
            font-size 10px
          .time
            font-size 10px
            color #93999F
        .score
          margin-bottom 6px
          /deep/ .van-rate__icon
            font-size 10px
          .score_num
            margin-right 5px
          .score_time
            font-size 10px
            color #93999F
        .text
          margin-bottom 10px
          display inline-block
          line-height 17px
        .attitude
          display flex
          align-items center
          flex-wrap wrap
          .icondianzan
            font-size 10px
            color #F5A100
            margin-right 8px
            margin-bottom 6px
          .icontucao-tianchong
            font-size 10px
            color #93999F
            margin-right 8px
            margin-bottom 6px
          .foodType
            padding 2px 4px 2px 4px
            color #93999F
            border 1px solid #E6E7E8
            margin-right 8px
            margin-bottom 5px
</style>
