<template>
  <div>
    <!-- 最外层 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside class="left">
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header class="header">
          <layout-header></layout-header>
        </el-header>
        <el-main class="main">主体</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    layoutAside,
    layoutHeader
  }
}
</script>
<style lang="less" scoped>

</style>
