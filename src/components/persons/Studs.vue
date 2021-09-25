<template>
  <PageTitle title="学生管理" @search="queryStudents"/>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>学生列表
            <small>{{ curClass.className }}</small>
          </h2>
          <ul class="nav navbar-right panel_toolbox">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-group"></i>{{ classBtnDesc }}</a>
              <ul class="dropdown-menu" role="menu">
                <li v-for="(classObj, index) in classes" :key="index" @click="selClass(index)"><a href="#">{{ classObj.className }}</a></li>
              </ul>
            </li>
            <li><a class="collapse-link" href="#" @click="upload"><i class="fa fa-cloud-upload"></i>导入</a>
            </li>
            <li class="dropdown">
              <a href="#" @click="add"><i class="fa fa-plus-square"></i>新增</a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="table-responsive">
            <table class="table table-striped jambo_table bulk_action">
              <thead>
              <tr class="headings">
                <th>
                  <input type="checkbox" id="check-all" class="flat">
                </th>
                <th class="column-title">姓名 </th>
                <th class="column-title">性别 </th>
                <th class="column-title">年龄 </th>
                <th class="column-title">身份号 </th>
                <th class="column-title">状态 </th>
                <th class="column-title" style="width: 30%">住址 </th>
                <th class="column-title">分数 </th>
                <th class="column-title no-link last">
                  <span class="nobr">操作</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(student, index) in students" :key="index" class="even pointer">
                <td class="a-center ">
                  <input type="checkbox" class="flat" name="personIdIndex">
                </td>
                <td class=" ">{{ student.name }}</td>
                <td class=" ">{{ student.sexDesc }}</td>
                <td class=" ">{{ student.age }}</td>
                <td class=" ">{{ student.personSerial }}</td>
                <td class=" "><button type="button"  :class="[{ 'btn-success': student.status == 6 }, 'btn', 'btn-xs']">{{ student.statusDesc }}</button></td>
                <td class=" ">{{ student.address }}</td>
                <td class=" ">{{ student.score }}</td>
                <td class=" last">
                  <a href="#" class="btn btn-primary btn-xs" @click="view(index)"><i class="fa fa-folder"></i> 查看 </a>
                  <a href="#" class="btn btn-info btn-xs" @click="edit(index)"><i class="fa fa-pencil"></i> 修改 </a>
                  <el-popover
                    placement="bottom"
                    :width="200"
                    trigger="click"
                    @hide="saveScore(index)"
                  >
                    <template #reference>
                      <a href="#" class="btn btn-warning btn-xs"><i class="fa fa-trash-o"></i> 调分 </a>
                    </template>
                    <el-input-number v-model="student.score" size="mini" />
                  </el-popover>
                  <a href="#" :class="[{ 'btn-success': student.status == 7 }, 'btn', 'btn-default', 'btn-xs']" @click="leave(index)"><i class="fa fa-trash-o"></i> {{ student.status == 6 ? '请假':'返校'}} </a>
                  <a href="#" class="btn btn-danger btn-xs" @click="del(index)"><i class="fa fa-trash-o"></i> 删除 </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <el-dialog
    v-model="infoDiag"
    title="学生信息"
    width="50%"
  >
    <detail :personObj="curPerson" :curClass="curClass" :action="action" :classArray="classes" @closeDiag="closeDetailPage"></detail>
  </el-dialog>
  <el-dialog
    v-model="uploadDialog"
    title="导入名单"
    width="60%"
  >
    <Upload @closeDiag="closeUploadPage" :curClass="curClass"></Upload>
  </el-dialog>
</template>
<script>
import PageTitle from '@/components/PageTitle'
import Detail from './Detail'
import { Post, Delete, Get } from '@/api/HttpClient'
import Upload from '@/components/persons/Upload'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default {
  name: 'Studs',
  components: { Upload, Detail, PageTitle },
  props: {
    searchContent: String
  },
  data: function () {
    return {
      classes: [],
      classBtnDesc: '',
      curClass: {},
      students: [],
      curPerson: {
        name: ''
      },
      infoDiag: false,
      uploadDialog: false,
      pageSize: 10,
      currentPage: 1,
      action: 'edit'
    }
  },
  mounted () {
    this.queryClasses()
    this.queryStudents()
    defineComponent({
      setup: function () {
        const num = ref(5)
        return num
      }
    })
  },
  methods: {
    queryClasses () {
      const that = this
      Post('http://localhost:8001/classes/simpleList', {}, function (response) {
        console.log(response)
        const data = response.data
        if (data.success) {
          const num = that.classes.length
          that.classes.splice(0, num)
          that.classes = data.data
          if (that.classes.length > 0) {
            that.curClass = that.classes[0]
            that.classBtnDesc = that.curClass.className
          }
        }
      })
    },
    selClass (index) {
      this.curClass = this.classes[index]
      this.classBtnDesc = this.curClass.className
      this.queryStudents()
    },
    queryStudents (searchContent) {
      console.log('searchContent: {}', searchContent)
      const data = {}
      data.keyWord = searchContent
      data.role = 5
      data.classId = this.curClass.classId
      const that = this
      Post('http://localhost:8001/persons/list', data, function (response) {
        const data = response.data
        if (data.success) {
          that.students = data.data
        }
      })
    },
    upload () {
      this.uploadDialog = true
    },
    add () {
      this.infoDiag = true
      this.curPerson = {}
      this.action = 'edit'
    },
    view (index) {
      console.log('查看')
      console.log(index)
      this.curPerson = this.students[index]
      this.infoDiag = true
      this.action = 'view'
    },
    edit (index) {
      console.log(index)
      console.log('编辑')
      this.curPerson = this.students[index]
      this.infoDiag = true
      this.action = 'edit'
    },
    del (index) {
      console.log(index)
      console.log('删除')
      const p = this.students[index]
      const that = this
      Delete('http://localhost:8001/persons/' + p.personId, {
      }, function (response) {
        if (response.data.success) {
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          that.queryStudents()
        }
      })
    },
    handleClose (done) {
      console.log(done)
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    closeUploadPage () {
      this.uploadDialog = false
      this.queryStudents()
    },
    closeDetailPage () {
      this.infoDiag = false
      this.queryStudents()
    },
    saveScore (index) {
      const stud = this.students[index]
      Post('http://localhost:8001/persons/changeScore', stud, function (response) {
        const data = response.data
        if (!data.success) {
          ElMessage({
            showClose: true,
            message: '更改失败',
            type: 'error'
          })
        }
      })
    },
    leave (index) {
      const stud = this.students[index]
      const that = this
      Get('http://localhost:8001/persons/changeDuty/' + stud.personId, {}, function (response) {
        const data = response.data
        if (!data.success) {
          ElMessage({
            showClose: true,
            message: '调整失败',
            type: 'error'
          })
        } else {
          that.queryStudents()
        }
      })
    }
  }
}
</script>

<style scoped>
.table>tbody>tr>td {
  text-align: left;
}
.x_title a {
  color: #405467;
}
</style>
