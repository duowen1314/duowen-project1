<template>
  <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 定义一个具名插槽 -->
        <el-breadcrumb-item>
            <slot name="title"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
