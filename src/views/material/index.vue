<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传功能 上传组件-->
    <!-- 必须有action 其中http-request可以自定义上传实现类型为function -->
    <el-upload action :http-request="uploadImg" :show-file-list="false">
      <el-button>上传图片</el-button>
    </el-upload>

    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-between">
              <i
                class="el-icon-star-on"
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected?'yellow':''}"
              ></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <!-- 收藏素材内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="space-between">
              <i
                class="el-icon-star-on"
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected?'yellow':''}"
              ></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
    {{page.total}}
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 分页点击当前页切换相应内容
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 上传图片自定义选择我图片之后执行
    // formdata类型
    uploadImg (params) {
      console.log(params)
      let obj = new FormData()
      obj.append('image', params.file)
      this.$axios({
        url: '/user/images', // 同样的地址 不同类型
        method: 'post',
        data: obj
      }).then(res => {
        this.getMaterial()
      })
    },
    // 切换全部和收藏的tab
    changeTab () {
      this.getMaterial()
    },
    // 收藏功能
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`你确定要${mess}收藏这张图片吗？`).then(() => {
        // 等确定的结果
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getMaterial() // 重新加载
        })
      })
    },
    // 删除功能
    delImg (item) {
      this.$confirm('你确定要删除吗？').then(() => {
        this.$axios({
          url: `/user/images/${item.id.toString()}`,
          method: 'delete'
        }).then(res => {
          this.getMaterial()
        })
      })
    },
    // 获取素材图片
    getMaterial () {
      console.log(this.activeName === 'collect')
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .el-card {
    width: 200px;
    height: 200px;
    margin: 25px;
    position: relative;

    .operate {
      margin-top: 10px;
      cursor: pointer;
    }
    .el-card__body {
      padding: 10px;
      img {
        width: 100%;
        max-height: 130px;
      }
    }
  }
}
</style>
