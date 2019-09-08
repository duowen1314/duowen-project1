<template>
    <div class="cover-image">
       <!-- //获取图片 -->
       <div @click="showDialog(index)" class="image-item" v-for="(item,index) in images" :key="index">
            <img :src="item ? item : defaultImg" alt="">
       </div>
       <!-- 弹出dialog -->
       <el-dialog :visible="dialogVisible" @close="closeDialog">
           <select-image @mySelectImg = "onSelectImg"></select-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      dialogVisible: false,
      selectIndex: -1,
      defaultImg: require('../../assets/imgs/pic_bg.png')
    }
  },
  methods: {
    // 子组件传来的数据
    onSelectImg (url) {
      console.log(url)
      this.dialogVisible = false
      this.$emit('onSendUrl', url, this.selectIndex)
    },
    // 点击图片现实dialog
    showDialog (index) {
      this.selectIndex = index // 将当前点击的索引付给data中
      this.dialogVisible = true
    },
    // 关闭dialog
    closeDialog () {
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
    .cover-image{
        display: flex;
        .image-item{
            width:200px;
            height: 200px;
            border:1px solid #ccc;
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>
