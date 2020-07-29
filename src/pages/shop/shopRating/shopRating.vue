<template>
  <div class="shopRating">
    shoprating
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['rating'])
  },
  mounted () {
    this.$store.dispatch('getShopRating')
  }
}
</script>
<style lang="stylus" scoped></style>
