<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <div class="col-sm-12">
            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
        </div>
        <div class="col-sm-12">学年信息</div>
      </div>
      <div class="col-sm-6">学生列表</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4]
    }
  }
}
</script>
<style scoped>
</style>
