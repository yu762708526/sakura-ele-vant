<template>
  <div class="search">
    <!-- 头部 -->
    <div class="search_header">
      <van-nav-bar>
        <template #title>
          搜索
        </template>
      </van-nav-bar>
    </div>
    <!-- 搜索框 -->
    <div class="searchInput">
      <van-search v-model="value" clearable show-action placeholder="请输入商家或美食名称" @search="onSearch">
        <template #action>
          <div @click="onSearch" class="search_right_input">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      alert(4455)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
.search
  .searchInput
    .search_right_input
      background-color $green
      width 60px
      color $color_fff
      text-align center
      font-size 16px
      font-weight 700
</style>
