<template>
  <div class="search">
    <!-- 头部 -->
    <div class="search_header">
      <van-nav-bar fixed="">
        <template #title>
          搜索
        </template>
      </van-nav-bar>
    </div>
    <!-- 搜索框 -->
    <div class="searchInput">
      <van-search v-model="keyword" clearable show-action placeholder="请输入商家或美食名称" @search="onSearch">
        <template #action>
          <div @click="onSearch" class="search_right_input">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 店铺部分 -->
    <div class="searchList" v-if="showList">
      <ul>
        <router-link tag="li" :to="{path:'/shop/goods',query:{id:item.id}}" class="listItem van-hairline--bottom"
          v-for="(item, index) in searchList" :key="index">
          <div class="item_img">
            <img class="img" :src="baseUrl+item.image_path" alt="">
          </div>
          <div class="item_content">
            <div class="name">{{item.name}}</div>
            <div class="count">月售 {{item.recent_order_num}} 单</div>
            <div class="price">{{item.float_minimum_order_amount}} 元起送 / 距离 {{item.longitude}} 公里</div>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="noSearch" v-if="nosearch">很抱歉! 搜索没有结果</div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      keyword: '',
      baseUrl: 'http://cangdu.org:8001/img/',
      showList: false,
      nosearch: false
    }
  },
  watch: {
    searchList (value) {
      if (value.length) {
        this.showList = true
      } else {
        this.nosearch = true
      }
    },
    keyword () {
      if (!this.keyword) {
        this.showList = false
        this.nosearch = false
      }
    }
  },
  computed: {
    ...mapState(['searchList'])
  },
  mounted () {
  },
  methods: {
    onSearch () {
      const keyword = this.keyword.trim()
      if (keyword) {
        this.$store.dispatch('getSearch', keyword)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
.search
  .searchInput
    position absolute
    top 45px
    left 0
    right 0
    .search_right_input
      background-color $green
      width 60px
      color $color_fff
      text-align center
      font-size 16px
      font-weight 700
  .searchList
    position absolute
    top 99px
    width 100%
    bottom 0
    .listItem
      display flex
      padding 10px
      background-color #fff
      .item_img
        .img
          width 50px
          height 50px
      .item_content
        flex 1
        margin-left 10px
        font-size 12px
        .name
          padding 2px 0 5px 0
        .count
          padding-bottom 5px
  .noSearch
    width 100%
    text-align center
    font-size 16px
    background-color #fff
    height 30px
    line-height 30px
    margin-top 99px
</style>
