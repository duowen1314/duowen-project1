<template>
  <div class="loginBox">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt="">
      </div>
      <el-form :model="loginForm" :rules="loginRules">
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
          <el-button type="primary" style="width:100%">主要按钮</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
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
        }]
      }
    }
  }
}
</script>

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
