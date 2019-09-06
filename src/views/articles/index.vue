<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form :model="searchForm" style="margin-left:50px;">
      <el-form-item label="文章状态">
        <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
        <el-radio-group v-model="searchForm.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="searchForm.channel_id"  @change="changeCondition">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker  @change="changeCondition"
          v-model="searchForm.dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 内容页面结构 -->
    <div class="total-info">共找到<template style="color:#c00">{{page.total}}</template>条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div class="article-item" v-for="item in list" :key="item.id">
        <div class="left">
          <img
            :src="item.cover.images.length ? item.cover.images[0] : defaultImg"
            alt
            style="width:180px;height:100px;"
          />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag :type="item.status | statusType" class="status">{{item.status | statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delItem(item)">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:10px 0">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next">
    </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        // 定义一个表单数据对象
        status: 5, // 状态
        channel_id: null,
        dateRange: [] // 数组[开始时间，结束时间]
      },
      channels: [], // 频道列表数据
      list: [], // 请求内容列表数据
      defaultImg: require('../../assets/imgs/404.png'), // base64字符串,
      page: { // 分页
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 删除功能
    delItem (item) {
      console.log(item.id.toString())
      this.$confirm('你确定要删除吗？').then(() => {
        this.$axios({
          url: `/articles/${item.id.toString()}`,
          method: 'delete'
        }).then(res => {
          console.log(res)
          this.getConditionArticle()
        })
      })
    },
    // 改变搜索条件时
    changeCondition () {
      this.page.page = 1 // 默认回到第一页
      this.getConditionArticle()
    },
    // 改变新页码
    changePage (newPage) {
      console.log(newPage)
      this.page.page = newPage
      this.getConditionArticle()
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 根据条件查询数据
    getConditionArticle () {
      // 组合条件 + 页码 状态/频道
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
            this.searchForm.dateRange.length > 0
              ? this.searchForm.dateRange[0]
              : null,
        end_pubdate:
            this.searchForm.dateRange.length > 1
              ? this.searchForm.dateRange[1]
              : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // 调用接口请求文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  },
  // 定义过滤器，定义状态
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    statusType: function (val) {
      switch (val) {
        case 0:
          return 'info'
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'success'
        default: break
      }
    }
  }

}
</script>

<style lang="less" scoped>
.total-info {
  font-size: 14px;
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
}
.article-item {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #efffef;
  .left {
    display: flex;
    img {
      border-radius: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      span {
        margin-bottom: 12px;
      }
      .title {
        font-size: 14px;
        color: #333;
      }
      .status {
        width: 70px;
        text-align: center;
      }
    }
    .date {
      font-size: 12px;
      color: #999;
    }
  }
  .right {
    span {
      cursor: pointer;
      margin-right: 8px;
      font-size: 12px;
    }
  }
}
</style>
