<template>
  <el-card class="account" v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账号信息</template>
    </bread-crumb>
    <!-- 上传图片 -->
    <el-upload  action="" class="photoBox" :http-request="uploadPhoto">
      <img :src="userForm.photo? userForm.photo : defaultImg" alt="" class="photo">
    </el-upload>
    <el-form ref="infoForm" :model="userForm" :rules="userFormRules" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="userForm.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userForm.mobile" disabled style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveInfo" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/events' // 公共的vue实例
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/imgs/home.jpg'),
      userForm: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      userFormRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名长度必须为4-8位'
        }],
        intro: [{ required: true, message: '内容简介不能为空' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]

      }
    }
  },
  methods: {
    // 上传图片
    uploadPhoto (params) {
      this.loading = true // 显示进度
      let data = new FormData()
      console.log(data)
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(res => {
        this.loading = false
        console.log(res)
        eventBus.$emit('updateUserInfo') // 触发，打个电话给头部个人信息，个人信息也要改变
        this.getUserInfo()
      })
    },

    // 保存用户信息
    saveInfo () {
      this.$refs.infoForm.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userForm
          }).then(res => {
            console.log(res)
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
            eventBus.$emit('updateUserInfo')
          })
        }
      })
    },
    // 请求用户名基本信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.userForm = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.account{
  position: relative;
  .photoBox{
    position: absolute;
    left:500px;
    top:100px;
    width:200px;
    height: 200px;
    overflow: hidden;
    border-radius: 100%;
    z-index: 4;
    cursor: pointer;
  }
  .photo{
    width:200px;
    height: 200px;
  }
}

</style>
