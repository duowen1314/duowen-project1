<template>
  <div class="loginBox">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt="">
      </div>
      <el-form>
        <el-form-item>
          <el-input  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
           <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
