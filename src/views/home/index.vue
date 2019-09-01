<template>
  <div>
    <!-- 最外层 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside class="left">
        左侧
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header class="header">头部</el-header>
        <el-main class="main">主体</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>

  .left{
    // width:200px;
    // height: 100vh;
    // background-color: #ccc;
  }
</style>
