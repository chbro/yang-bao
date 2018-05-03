<template>
  <div class="mod_release">
    这是一个页面
  </div>
</template>

<script>
import { getRelease } from '@/util/getData'

export default {
  data () {
    return {}
  },
  created () {
    getRelease(2).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="stylus" scoped>
.mod_release
  box-sizing border-box
  width 100%
  padding 30px 5%
</style>

