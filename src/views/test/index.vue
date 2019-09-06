<template>
  <div>
      <el-card>
          <el-select v-model="value">
              <el-option
      v-for="item in data"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
          </el-select>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        value: '1',
        label: 'haha'
      }, {
        value: '2',
        label: 'xixi'
      }, {
        value: '3',
        label: 'hehe'
      }
      ],
      value: ''
    }
  }
}
</script>

<style>

</style>
