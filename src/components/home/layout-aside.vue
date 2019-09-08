<template>
<div class="layout-aside">
    <div class="title-logo">
        <a href="#">
            <img src="../../assets/imgs/logo_admin.png" alt="">
        </a>
    </div>
   <el-menu router class="menuLayout" background-color="#323745"
      text-color="#adafb5"
      active-text-color="#ffd04b" style="width:201px">

      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu  index="2">
          <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu  index="3">
          <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>粉丝管理</span>
        </template>
          <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
          <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
      </el-submenu>
     <el-menu-item index="/home/account">
        <i class="el-icon-s-home"></i>
        <span slot="title">账号信息</span>
      </el-menu-item>

   </el-menu>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

.layout-aside{
        width:200px;
       .menuLayout{
           height: 100vh;
       }
       .title-logo{
           height: 60px;
           display: flex;
           background: #2e2f32;
           justify-content: center;
           align-items: center;

           img{
               height: 30px;
           }
       }
   }
</style>
