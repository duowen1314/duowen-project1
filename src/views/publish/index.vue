<template>
  <div>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:100px;">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" style="width:800px" :rows="4" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
          <el-select v-model="formData.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish" type="primary">发表文章</el-button>
        <el-button type="info">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
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
        }],
        content: [{
          required: true,
          message: '请输入内容'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空'
        }]
      }
    }
  },
  methods: {
    // 获取频道列表数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    // 点击发布按钮
    publish () {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft: false }, // draft 为true时 就是草稿
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
  }
}
</script>

<style>
</style>
