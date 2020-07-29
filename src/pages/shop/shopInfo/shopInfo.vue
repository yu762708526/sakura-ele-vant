<template>
  <div class="shopInfo">
    shopinfo
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['info'])
  }
}
</script>
<style lang="stylus" scoped></style>
