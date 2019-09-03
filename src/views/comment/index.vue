<template>
  <el-card>
    <bread-crumb slot="header">
      <template  slot="title">
        评论列表
      </template>
    </bread-crumb>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column width="650" label="标题" prop="name"></el-table-column>
      <el-table-column label="评论状态" prop="date"></el-table-column>
      <el-table-column label="总评论数" prop="address"></el-table-column>
      <el-table-column label="粉丝评论数" prop="address"></el-table-column>
      <el-table-column label="操作" prop="address"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>

</style>
