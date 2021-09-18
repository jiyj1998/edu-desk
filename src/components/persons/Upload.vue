<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <ul class="nav navbar-left panel_toolbox">
            <li><a  href="http://localhost:8001/persons/exportTemplate" class="collapse-link"><i class="fa fa-arrow-circle-o-down"></i>模板</a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="col-sm-6">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-6">
            <form id="upload" action="http://localhost:8001/persons/importExcel" class="dropzone" method="post" enctype="multipart/form-data">
              <input type="hidden" name="classId" value="123">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
export default {
  name: 'Upload',
  data: function () {
    return {
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  mounted () {
    const myDropzone = new Dropzone('#upload')
    myDropzone.on('addedfile', file => {
      // eslint-disable-next-line no-template-curly-in-string
      console.log('File added: ${file.name}')
    })
  }
}
</script>
<style scoped>

</style>
