<template>
  <div class="loginBox">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt="">
      </div>
      <!-- 数据校验 首先要给el-form 一个model属性 表示数据对象 -->
      <!-- 绑定 ：rules 校验规则 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <!-- 表单项prop绑定需要校验的字段名 但是不写 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
           <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

  data () {
    let validator = (rule, value, callback) => {
      if (value) {
        callback() // 如果value为true直接通过
      } else {
        callback(new Error('您必须无条件被坑'))
      }
    }
    return {
      // el-form绑定的model属性值
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 同意
      },
      // 定义校验规则
      loginRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号码格式不正确'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码长度必须为6个数字',
          trigger: 'blur'
        }],
        check: [{
          validator
        }]
      }
    }
  },
  methods: {
    login () {
      // console.log(this.loginForm.check)
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          // 请求
          // $ajax 为vue原型实例属性
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            console.log(res)
            if (res.status === 201) {
              // 放到前端缓存中
              localStorage.setItem('username', res.data.data.token)
              this.$router.push('/')
            }
          }).catch(() => {
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>
// scoped 只对当前HTML其作用
<style lang="less" scoped>
  .loginBox{
    height: 100vh;
    background:url(../../assets/imgs/login_bg.jpg) no-repeat;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
      width:400px;
      height: 300px;
      .title{
         text-align: center;
        img{
          height: 30px;
        }
      }
    }
  }
</style>
