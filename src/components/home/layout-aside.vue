<template>
<div class="layout-aside">
    <div class="title-logo">
        <a href="#">
            <img src="../../assets/imgs/logo_admin.png" alt="">
        </a>
    </div>
   <el-menu background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu  index="2">
          <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item>发布文章</el-menu-item>
          <el-menu-item>内容列表</el-menu-item>
          <el-menu-item>评论列表</el-menu-item>
          <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu  index="3">
          <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
          <el-menu-item>图文数据</el-menu-item>
          <el-menu-item>内容列表</el-menu-item>
          <el-menu-item>评论列表</el-menu-item>
          <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
   </el-menu>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

.layout-aside{
       height: 100vh;
       .title-logo{
           background: #2e2f32;
       }
   }
</style>
