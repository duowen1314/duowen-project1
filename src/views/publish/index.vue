<template>
  <div>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:100px;">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor  style="width:800px;height:300px;margin-left:50px;"
         v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px;">
        <!-- 监听radio的改变事件 -->
        <el-radio-group @change="changeCoverType"  v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面图片组件 -->
      <el-form-item>
        <cover-image @onSendUrl = "getUrl" :images="formData.cover.images"></cover-image>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
          <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish(false)"  type="primary">发表文章</el-button>
        <el-button @click="publish(true)" type="info">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    let coverRulse = function (rule, value, callBack) {
      console.log(value)
      if (value.type === 1) {
        (value.images.length === 1 && value.images[0]) ? callBack() : callBack(new Error('对不起，您为设置封面'))
      } else if (value.type === 3) {
        if (value.images.length === 3 && value.images[0] && value.images[1] && value.images[2]) {
          callBack()
        } else {
          callBack(new Error('对不起，您为设置全三图的封面'))
        }
      } else {
        // 无图或自动
        if (value.images.length > 0) {
          callBack(new Error('对不起，您的封面设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      channels: [],
      // 表单绑定的数据对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null // 频道列表

      },
      // 校验规则
      publishRules: {
        title: [{
          required: true,
          message: '请输入标题'
        }, {
          min: 5,
          max: 30,
          message: '标题为5到30之间字符'
        }],
        content: [{
          required: true,
          message: '请输入内容'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空'
        }],
        cover: [{
          validator: coverRulse
        }]
      }
    }
  },
  methods: {
    // 获取到url
    getUrl (url, index) {
      console.log(url)
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (i === index) {
          return url
        }
        return item
      })
    },
    // 切换封面类型 根据当前类型决定images结构
    changeCoverType () {
      console.log(this.formData.cover.type)
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 有一张封面 待选择
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三张封面 待选择
      } else {
        this.formData.cover.images = [] // 自动或者无图 没有内容
      }
    },
    // 获取频道列表数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    // 获取默认文章
    getPublish (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        console.log(res)
        this.formData = res.data
      })
    },
    // 点击发布按钮或者草稿按钮
    publish (isP) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          let url = articleId ? `/articles/${articleId}` : '/articles'
          let method = articleId ? 'put' : 'post'
          this.$axios({
            url,
            method,
            params: { draft: isP }, // draft 为true时 就是草稿
            data: this.formData
          }).then(() => {
            //   编程式导航
            this.$router.push('/home/articles') // 跳转到文章列表页面
          })
        }
      })
    }

  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取地址栏id
    if (articleId) {
      // 如果存在说明是修改文章
      this.getPublish(articleId)
    }
  }
}
</script>

<style>
</style>
