<template>
  <div>
    <!-- 最外层 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside class="left" style="width:200px;">
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
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {

}
</script>
<style lang="less" scoped>

</style>
