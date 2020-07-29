<template>
  <div class="personal">
    <!-- 头部 -->
    <div class="personal_header">
      <van-nav-bar>
        <template #title>
          我的
        </template>
      </van-nav-bar>
    </div>
    <!-- 登录注册 -->
    <router-link :to="userInfo._id?'/userinfo':'/login'" class="login van-hairline--top">
      <div class="lefr_logo">
        <i class="iconfont icongeren"></i>
      </div>
      <div class="right_text">
        <div class="right_text_left">
          <div class="loginRegister" v-if="!userInfo.phone">
            {{userInfo.name || '登录|注册'}}
          </div>
          <div class="phone_text">
            <span class="pnone_logo">
              <span class="iconfont iconshouji"></span>
            </span>
            <span class="phone_text">{{userInfo.phone || '暂无绑定手机号'}}</span>
          </div>
        </div>
        <div class="right_text_right">
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
    </router-link>
    <!-- 余额 -->
    <div class="num">
      <div class="num_item van-hairline--right">
        <div class="left_num item">
          <span class="left_num_color">0.00</span>
          <span class="left_num_text">元</span>
        </div>
        <div class="text">我的余额</div>
      </div>
      <div class="num_item van-hairline--right">
        <div class="mid_num item">
          <span class="mid_num_color">0</span>
          <span class="mid_num_text">个</span>

        </div>
        <div class="text">我的优惠</div>
      </div>
      <div class="num_item">
        <div class="right_num item">
          <span class="right_num_color">0</span>
          <span class="right_num_text">分</span>

        </div>
        <div class="text">我的积分</div>
      </div>
    </div>
    <!-- 订单商城 -->
    <div class="type van-hairline--top">
      <div class="type_item">
        <div class="icon">
          <span class="iconfont icondingdan"></span>
        </div>
        <div class="text van-hairline--bottom">
          <div class="text_item">我的订单</div>
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
      <div class="type_item">
        <div class="icon">
          <span class="iconfont iconintegral"></span>
        </div>
        <div class="text van-hairline--bottom">
          <div class="text_item">积分商城</div>
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
      <div class="type_item">
        <div class="icon">
          <span class="iconfont iconhuiyuan-"></span>
        </div>
        <div class="text ">
          <div class="text_item">饿了么外卖会员卡</div>
          <span class="iconfont iconjiantou"></span>
        </div>
      </div>
    </div>
    <!-- 服务中心 -->
    <div class="service van-hairline--top van-hairline--bottoml5">
      <div class="icon">
        <span class="iconfont iconfuwuzhongxin"></span>
      </div>
      <div class="text ">
        <div class="text_item">服务中心</div>
        <span class="iconfont iconjiantou"></span>
      </div>
    </div>
    <van-button type="primary" block class="outLogin" v-show="userInfo._id" @click="logout">退出登录</van-button>
  </div>
</template>
<script>
import { Toast, Dialog } from 'vant'

import { mapState } from 'vuex'
import { reqLogout } from '../../api/index'
export default {
  components: {
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 用户登出
    logout () {
      Dialog.confirm({
        message: '你确定要退出吗'
      })
        .then((confirm) => {
          // on confirm
          this.$store.dispatch('outLogin')
          Toast('退出成功')
        })
        .catch((cancel) => {
          // on cancel
          Toast('取消成功')
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
.personal
  .login
    border-top 1px solid $color_fff
    height 100px
    background-color $green
    display flex
    align-items center
    box-sizing border-box
    padding 10px 8px
    width 100%
    .lefr_logo
      margin-right 14px
      border-radius 50%
      overflow hidden
      width 76px
      height 60px
      .iconfont
        font-size 60px
        background #e4e4e4
    .right_text
      display flex
      justify-content space-between
      width 100%
      align-items center
      .right_text_left
        color $color_fff
        .loginRegister
          font-size 18px
          font-weight 700
          padding-bottom 12px
        .phone_text
          .pnone_logo
            .iconfont
              font-size 20px
          .phone_text
            font-size 16px
      .right_text_right
        color $color_fff
        .iconfont
          font-size 20px
  .num
    height 80px
    display flex
    background-color $color_fff
    align-items center
    text-align center
    margin-bottom 10px
    .num_item
      flex 1
      height 80px
      align-items center
      box-sizing border-box
      padding-top 10px
      .text
        font-size 14px
        padding-top 10px
      .left_num
        .left_num_color
          font-size 30px
          color #FF9900
          font-weight 700
        .left_num_text
          font-size 14px
      .mid_num
        .mid_num_color
          font-size 30px
          color #FF5F3E
          font-weight 700
        .mid_num_text
          font-size 14px
      .right_num
        .right_num_color
          font-size 30px
          color #6AC20B
          font-weight 700
        .right_num_text
          font-size 14px
  .type
    height 160px
    background-color $color_fff
    box-sizing border-box
    margin-bottom 10px
    .type_item
      height 33%
      width 100%
      display flex
      align-items center
      .icon
        padding-left 10px
        .iconfont
          font-size 20px
          &.icondingdan
            color $green
          &.iconintegral
            color #FF6B4C
          &.iconhuiyuan-
            color #FF9900
      .text
        display flex
        justify-content space-between
        width 100%
        height 100%
        align-items center
        padding 0 10px
        .text_item
          font-size 15px
        .iconfont
          font-size 24px
          color #C7C7C7
  .service
    height 53px
    width 100%
    display flex
    align-items center
    background-color $color_fff
    .icon
      padding-left 10px
      .iconfont
        font-size 20px
        &.iconfuwuzhongxin
          color $green
    .text
      display flex
      justify-content space-between
      width 100%
      height 100%
      align-items center
      padding 0 10px
      .text_item
        font-size 15px
      .iconfont
        font-size 24px
        color #C7C7C7
  .outLogin
    margin-top 10px
</style>
