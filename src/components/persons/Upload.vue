<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_content">
          <div class="col-sm-6">
            <div class="role-list">
              <el-radio-group v-model="role.value">
                <el-radio :label="role.student">学生</el-radio>
                <el-radio :label="role.teacher">老师</el-radio>
              </el-radio-group>
            </div>
            <div class="ln_solid"></div>
            <div class="class-list" v-if="role.value == role.student">
              <el-radio v-for="( classOne, index ) in classArray"
                        :key="index"
                        v-model="classObj.classId"
                        :label="classOne.classId"
                        border
                        class="class_item"
              >{{ classOne.className }}</el-radio>
            </div>
          </div>
          <div class="col-sm-6">
            <div v-show="students.length > 0">
              <div class="temp-student-list">
                <el-button type="danger" icon="el-icon-delete" circle @click="clearStudent"></el-button>
                <el-button type="success" icon="el-icon-check" circle @click="confirm"></el-button>
              </div>
              <div class="ln_solid"></div>
              <div class="student-list">
                <el-scrollbar max-height="400px">
                  <el-tag v-for="(student, index) in students" :key="index" closable type="success" @close="removePerson(index)">
                    {{student.name}}
                  </el-tag>
                </el-scrollbar>
              </div>
            </div>
            <div v-show="students.length == 0">
              <div class="template-download">
                <a  href="http://localhost:8001/persons/exportTemplate" class="collapse-link"><i class="fa fa-paperclip"></i>模板</a>
              </div>
              <div class="ln_solid"></div>
              <form id="upload" action="http://localhost:8001/persons/importExcel" class="dropzone" method="post" enctype="multipart/form-data">
                <input type="hidden" name="role" v-model="role.value">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import { Post } from '@/api/HttpClient'
import { ElMessage } from 'element-plus'

export default {
  name: 'Upload',
  props: {
    curClass: Object
  },
  data: function () {
    return {
      role: {
        student: 5,
        teacher: 4,
        value: 5
      },
      classObj: {
        classId: 0
      },
      classArray: [],
      students: [],
      serialNo: 0
    }
  },
  watch: {
    curClass: {
      deep: true,
      immediate: true,
      handler (newObj) {
        this.classObj = newObj
      }
    }
  },
  mounted () {
    const that = this
    const myDropzone = new Dropzone('#upload')
    myDropzone.on('success', (file, resp) => {
      // eslint-disable-next-line no-template-curly-in-string
      console.log('123', resp)
      console.log(file)
      if (resp.success) {
        that.students.splice(0, that.students.length)
        that.students = resp.data.datas
        that.serialNo = resp.data.serialNo
        file.previewElement.parentNode.removeChild(file.previewElement)
      }
    })
    this.queryClasses()
  },
  methods: {
    queryClasses () {
      const that = this
      Post('http://localhost:8001/classes/simpleList', {}, function (response) {
        const data = response.data
        console.log(data)
        if (data.success) {
          const num = that.classArray.length
          that.classArray.splice(0, num)
          that.classArray = data.data
        }
      })
    },
    clearStudent () {
      this.students.splice(0, this.students.length)
    },
    confirm () {
      const data = {}
      data.serialNo = this.serialNo
      data.role = this.role.value
      data.classId = this.classObj.classId
      const that = this
      Post('http://localhost:8001/persons/confirm', data, function (response) {
        console.log(response)
        const data = response.data
        if (data.success) {
          that.closeDiag()
        } else {
          ElMessage.warning({
            message: '数据已过期，请重新上传',
            type: 'warning'
          })
        }
        that.clearStudent()
      })
    },
    closeDiag () {
      this.$emit('closeDiag')
    },
    removePerson (index) {
      this.students.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.el-dialog__body {
  padding: 0;
}
.ln_solid {
  margin: 0 0 10px 0;
}
.class-list, .student-list .el-scrollbar__view {
  display: flex;
  flex-wrap: wrap;
}
.student-list .el-tag {
  margin-right: 10px;
}
.class-list .class_item {
  margin-left: 0 !important;
  margin-right: 10px;
}
.template-download, .temp-student-list {
  height: 45px;
}
.template-download {
  padding: 10px 0;
}
</style>
