<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template  slot="title">
        评论列表
      </template>
    </bread-crumb>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column  width="500" label="标题" prop="title"></el-table-column>
      <!-- formatter是el-table-column属性 -->
      <!-- prop是字段名 -->
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column width="100" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作" prop="address"  width="200">
        <!-- 作用域插槽slot-scope="变量" 变量就是row,colum,$index.store的属性集合 obj.row -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" :style="{color:obj.row.comment_status ? '#e6a23c':'#409eff'}" type="text">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" style="text-align:center;margin-top:30px;">
    </el-pagination>
  </el-card>
</template>

<script>
import { getComments, openOrClose } from '../../api/comment'
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        pageSize: 10, // 当前每页条数
        total: 0// 总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 给当前页码更新最新值
      this.page.page = newPage
      this.getComments() // 获取最新页码的数据
    },
    async  openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您是否要${mess}评论?`, '提示')
      // 写调用接口
      // await this.$axios({
      //   method: 'put',
      //   url: '/comments/status',
      //   params: { article_id: row.id.toString() },
      //   data: { allow_comment: !row.comment_status }
      // })
      await openOrClose({ article_id: row.id.toString() }, { allow_comment: !row.comment_status })
      this.getComments()// 成功之后重新调用数据
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    // 获取评论列表
    async getComments () {
      this.loading = true // 请求数据之前把进度条打开
      // query 相当于get参数 路径参数 URL参数
      // body 路径 参数 data
      let res = await getComments({
        response_type: 'comment',
        page: this.page.page,
        per_page: this.page.pageSize
      })
      this.loading = false // 响应回来后把进度条关了
      console.log(res)
      this.list = res.data.results
      this.page.total = res.data.total_count
    }

  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
