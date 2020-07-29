<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="this.$route.meta.show"></footer-guide>
  </div>
</template>
<script>
import FooterGuide from './components/footer-guide/footerGuide'
export default {
  components: {
    FooterGuide
  }
}
</script>
<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
