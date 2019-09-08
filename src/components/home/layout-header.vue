<template>
  <div class="layout-header">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8" class="left">
        <i class="el-icon-s-unfold"></i>
        <span>江苏传智播客教育科技有限责任公司</span>
      </el-col>
      <el-col :span="4" class="right">
            <span class="user-pic">
                <img :src="userinfo.photo ? userinfo.photo : defaultImg" alt="">
            </span>
          <el-dropdown  @command="handleMenuItem">
            <span class="el-dropdown-link">
              {{userinfo.name}}
              <i class=" el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="account">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      userinfo: {},
      defaultImg: require('../../assets/imgs/avatar.jpg')
    }
  },
  methods: {
    // 获取用户个人信息
    getUserInfo () {
    //   let token = localStorage.getItem('username')// 获取token
      //   console.log(token)
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        console.log(res)
        this.userinfo = res.data
      })
    },
    handleMenuItem (command) {
      if (command === 'account') {
        // 账号信息
      } else if (command === 'git') {
        location.href = 'https://github.com/shuiruohanyu/82heimatoutiao'
      } else {
        localStorage.clear()
        this.$router.push('/login') // 跳转到登录页
      }
    }
  },
  created () {
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header {
    .row-bg{
        align-items: center;
    }
  .left {
    span {
      font-size: 16px;
      padding-left:10px;
    }

  }
  .right{
      display: flex;
      align-items: center;

      .user-pic{
          margin:0 8px;
          width:40px;
          height:40px;
          overflow: hidden;
          border-radius: 100%;
          img{
            width:100%;
            height: 100%;
          }
      }
  }
}
</style>
