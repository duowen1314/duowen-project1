<template>
  <div>
    <!-- 最外层 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside class="left" :style="{width:collapse?'61px':'201px'}" style="overflow:hidden">
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header class="header">
          <layout-header></layout-header>
        </el-header>
        <el-main class="main" style="margin:0;padding:0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('openOrClose', (status) => {
      this.collapse = status
    })
  }
}
</script>
<style lang="less" scoped>

</style>
