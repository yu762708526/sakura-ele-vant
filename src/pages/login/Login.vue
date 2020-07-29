<template>
  <div class="login">
    <div class="login_content">
      <div class="title">外卖</div>
      <!-- tab导航栏 -->
      <div class="tab">
        <div class="tab_code" :class="{on:showLight}" @click="showLight = true">短信登陆</div>
        <div class="tab_pas" :class="{on:!showLight}" @click="showLight = false">密码登陆</div>
      </div>
      <!-- 表单栏 -->
      <div class="form">
        <form action="#" @submit.prevent="login">
          <!-- 手机号登陆 -->
          <div class="code" v-if="showLight">
            <div class="phone">
              <input required="required" type="tel" maxlength="11" placeholder="手机号" class="phone_input" v-model="phone"
                ref="phone_input">
              <a href="javascript:;" class="clear_input" @click="ClearPhoneinput">
                <van-icon name="close" class="clear_input_item" />
              </a>
              <button :disabled="!SendCode" class="btn" :class="{on:SendCode}"
                @click.prevent="getCode">{{count>0?`已发送${count}s`:'获取验证码'}}</button>
            </div>
            <div class="code_pas">
              <input required="required" type="tel" maxlength="6" placeholder="验证码" class="code_input" v-model="code"
                ref="code_input">
              <a href="javascript:;" class="clear_input" @click="Clearcodeinput">
                <van-icon name="close" class="clear_input_item" />
              </a>
            </div>
            <div class="text">
              温馨提示：未注册南航外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="#">《用户服务协议》</a>
            </div>
          </div>
          <!-- 密码登陆 -->
          <div class="password" v-if="!showLight">
            <div class="user">
              <input required="required" type="tel" maxlength="11" placeholder="手机/邮箱/用户名" class="phone_input"
                v-model="name" ref="user_input">
              <a href="javascript:;" class="clear_input" @click="ClearNameinput">
                <van-icon name="close" class="clear_input_item" />
              </a>
            </div>
            <div class="pas">
              <input required="required" type="password" maxlength="8" placeholder="密码" class="pas_input" v-model="pwd"
                v-if="!showText">
              <input required="required" type="tel" maxlength="8" placeholder="密码" class="pas_input" v-model="pwd"
                v-if="showText">
              <a href="javascript:;" class="clear_input" @click="ClearPwdinput">
                <van-icon name="close" class="clear_input_item" />
              </a>
              <div class="togglePas">
                <div class="content" @click="showText = !showText" :class="showText?'on':'off'">
                  <div class="content_item" :class="showText?'on':'off'">
                  </div>
                  <div class="content_text">
                    ...
                  </div>
                  <div class="contentStr" v-show="showText">abc</div>
                </div>
              </div>
            </div>
            <div class="code">
              <input required="required" type="text" maxlength="4" placeholder="验证码" class="code_input"
                v-model="captcha">
              <a href="javascript:;" class="clear_input" @click="ClearCaptchainput">
                <van-icon name="close" class="clear_input_item" />
              </a>
              <div class="captcha">
                <img src="http://localhost:4000/captcha" class="captcha_img" alt="" @click="updataCaptcha"
                  ref="Captcha">
              </div>
            </div>
          </div>
          <van-button class="button" type="primary" block color="#4CD96F">登录</van-button>
        </form>
        <div class="info">关于我们</div>
      </div>
    </div>
    <div class="back_personal" @click="$router.back()">
      <van-icon name="arrow-left" class="arrow_left" />
    </div>
    <!-- 弹框组件 -->
    <alert-dialog :text="text" v-show="show" @closeDialog="closeParent"></alert-dialog>
  </div>
</template>
<script>
import { reqSendcode, reqLoginSms, reqLoginPwd } from '../../api/index'
import AlertDialog from '../../components/Dialog/Dialog'
export default {
  components: {
    AlertDialog
  },
  data () {
    return {
      // tab高亮是否显示
      showLight: true,
      // 是否显示密码
      showPassword: false,
      // 手机号
      phone: '',
      // 手机验证码
      code: '',
      // 用户名
      name: '',
      // 密码
      pwd: '',
      // 图片验证码
      captcha: '',
      // 发送短信倒计时
      count: 0,
      // 是否显示弹窗
      show: false,
      // 弹窗内容
      text: '',
      // 密码是否显示
      showText: false
    }
  },
  methods: {
    // 获取验证码
    async getCode () {
      if (this.count === 0) {
        this.count = 30
        this.setIntervalId = setInterval(() => {
          this.count--
          if (this.count <= 0) {
            clearInterval(this.setIntervalId)
          }
        }, 1000)
        const result = await reqSendcode(this.phone)
        if (result.code === 1) {
          this.show = !this.show
          this.text = result.msg
          if (this.count) {
            this.count = 0
            clearInterval(this.setIntervalId)
          }
        }
      }
    },
    // 登陆
    async login () {
      // 手机号验证码登陆
      if (this.showLight) {
        // 验证手机号和验证码
        if (!this.SendCode) {
          this.show = !this.show
          this.text = '请输入正确的手机号'
          return
        } else if (!/^\d{6}$/.test(this.code)) {
          this.show = !this.show
          this.text = '请输入6位数验证码'
          return
        }
        // 验证成功后开始登陆
        const result = await reqLoginSms(this.phone, this.code)
        if (result.code === 0) {
          const userInfo = result.data
          this.$store.dispatch('getUserInfo', userInfo)
          this.$router.replace('/personal')
        } else {
          this.show = !this.show
          this.text = result.msg
        }
      } else { // 用户名密码登陆
        const { name, pwd, captcha } = this
        const result = await reqLoginPwd({ name, pwd, captcha })
        if (result.code === 0) {
          const userInfo = result.data
          this.$store.dispatch('getUserInfo', userInfo)
          this.$router.replace('/personal')
        } else {
          this.show = !this.show
          this.text = result.msg
        }
      }
    },
    // 点击更新图片验证码
    updataCaptcha () {
      this.$refs.Captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 关闭弹窗
    closeParent () {
      this.show = !this.show
    },
    // 清除input内容
    ClearPhoneinput () {
      this.phone = ''
    },
    Clearcodeinput () {
      this.code = ''
    },
    ClearNameinput () {
      this.name = ''
    },
    ClearPwdinput () {
      this.pwd = ''
    },
    ClearCaptchainput () {
      this.captcha = ''
    }
  },
  computed: {
    // 手机号格式正确才能发送验证码
    SendCode () {
      return /^1[3-9]\d{9}$/.test(this.phone)
    }

  }
}
</script>
<style lang="stylus" scoped>
.styleDialog
  height 200px
@import '~styles/variables.styl'
.login
  height 100%
  width 100%
  background-color #FFFFFF
  .login_content
    width 80%
    margin 0 auto
    padding-top 60px
    text-align center
    .title
      font-size 40px
      color $green
      font-weight 700
    .tab
      display flex
      width 100%
      justify-content center
      padding-top 40px
      .tab_code
        margin-right 30px
        font-size 14px
        padding-bottom 5px
        &.on
          border-bottom 2px solid $green
          color $green
          font-weight 600
      .tab_pas
        font-size 14px
        padding-bottom 5px
        &.on
          border-bottom 2px solid $green
          color $green
          font-weight 600
    .form
      .code
        .phone
          height 48px
          line-height 40px
          border 1px solid #dddddd
          display flex
          align-items center
          margin-top 10px
          position relative
          .phone_input
            width 60%
            height 100%
            font-size 14px
            padding-left 10px
          .clear_input
            display none
            .clear_input_item
              height 48px
              line-height 48px
          .phone_input:valid + .clear_input
            display block
          .btn
            position absolute
            right 8px
            width 80px
            background-color #FFFFFF
            border none
            font-size 14px
            color #CCCCCC
            height 16px
            line-height 16px
            &.on
              color #000000
        .code_pas
          height 48px
          line-height 40px
          border 1px solid #dddddd
          display flex
          align-items center
          margin-top 16px
          .code_input
            width 100%
            height 100%
            font-size 14px
            padding-left 10px
          .clear_input
            display none
            .clear_input_item
              height 48px
              line-height 48px
              padding-right 10px
          .code_input:valid + .clear_input
            display block
        .text
          font-size 14px
          color #999999
          line-height 20px
          margin-top 12px
          a
            color $green
      .password
        .user
          height 48px
          line-height 40px
          border 1px solid #dddddd
          display flex
          align-items center
          margin-top 10px
          .phone_input
            width 100%
            height 100%
            font-size 14px
            padding-left 10px
          .clear_input
            display none
            .clear_input_item
              height 48px
              line-height 48px
              padding-right 10px
          .phone_input:valid + .clear_input
            display block
        .pas
          height 48px
          line-height 40px
          border 1px solid #dddddd
          display flex
          align-items center
          margin-top 16px
          .pas_input
            width 100%
            height 100%
            font-size 14px
            padding-left 10px
          .clear_input
            display none
            .clear_input_item
              height 48px
              line-height 48px
              padding-right 10px
          .pas_input:valid + .clear_input
            display block
          .togglePas
            .content
              width 45px
              height 17px
              border 1px solid #E5E5E5
              border-radius 10px
              position relative
              display flex
              margin-right 10px
              &.on
                background-color #02A774
                transition all 0.5s
              &.off
                background-color #fff
                transition all 0.5s
              .content_item
                width 18px
                height 18px
                border-radius 50%
                border 1px solid #E5E5E5
                position absolute
                top -1px
                left -2px
                background-color #FFFFFF
                z-index 10
                &.on
                  transform translateX(28px)
                  transition transform 0.5s
                &.off
                  transition transform 0.5s
              .content_text
                position absolute
                top -12px
                right 8px
                color #DEDEDE
              .contentStr
                position absolute
                top -12px
                left 5px
                color #fff
        .code
          height 48px
          line-height 40px
          border 1px solid #dddddd
          display flex
          align-items center
          margin-top 16px
          .code_input
            width 100%
            height 100%
            font-size 14px
            padding-left 10px
          .clear_input
            display none
            .clear_input_item
              height 48px
              line-height 48px
              padding-right 10px
          .code_input:valid + .clear_input
            display block
          .captcha
            height 100%
            .captcha_img
              height 100%
              display block
      .button
        margin-top 30px
        font-size 16px
    .info
      font-size 10px
      color #A7A7A7
      margin-top 25px
  .back_personal
    position absolute
    top 0
    left 0
    .arrow_left
      font-size 30px
      color #9A9A9A
</style>
