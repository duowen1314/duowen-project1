<template>
  <div class="dialogImg">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all" class="img-item">
        <div v-for="item in list" :key="item.id">
          <img @click="selectImg(item)" :src="item.url" alt />
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <el-upload action="" :show-file-list="false" :http-request="uploadImg" class="avatar-puloader">
 <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 6,
        total: 0
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      let image = new FormData()
      image.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: image
      }).then(res => {
        console.log(res)
        this.$emit('onSelectImg', res.data.url)
      })
    },
    selectImg (item) {
      this.$emit('mySelectImg', item.url)
    },
    // 点击分页切换图片素材
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    //  获取图片素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.page.total = res.data.total_count
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.dialogImg {
  .img-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    div {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
      box-shadow: 1px 2px 2px #ccc;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
