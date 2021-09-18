<template>
  <PageTitle title="学生管理"/>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>学生列表<small>101班级</small></h2>
          <ul class="nav navbar-right panel_toolbox">
            <li><a class="collapse-link" href="#" @click="upload"><i class="fa fa-cloud-upload"></i>导入</a>
            </li>
            <li class="dropdown">
              <a href="#" @click="view"><i class="fa fa-plus-square"></i>新增</a>
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
                <th class="column-title" style="width: 40%">住址 </th>
                <th class="column-title no-link last">
                  <span class="nobr">操作</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(students, personId) in students" :key="personId" class="even pointer">
                <td class="a-center ">
                  <input type="checkbox" class="flat" name="personIdIndex">
                </td>
                <td class=" ">{{ students.name }}</td>
                <td class=" ">{{ students.sexDesc }}</td>
                <td class=" ">{{ students.age }}</td>
                <td class=" ">{{ students.personSerial }}</td>
                <td class=" ">{{ students.address }}</td>
                <td class=" last">
                  <a href="#" class="btn btn-primary btn-xs" @click="view"><i class="fa fa-folder"></i> 查看 </a>
                  <a href="#" class="btn btn-info btn-xs" @click="edit"><i class="fa fa-pencil"></i> 修改 </a>
                  <a href="#" class="btn btn-danger btn-xs" @click="del"><i class="fa fa-trash-o"></i> 删除 </a>
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
    v-model="dialogVisible"
    title="学生信息"
    width="50%"
  >
    <detail></detail>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="uploadDialog"
    title="导入名单"
    width="50%"
  >
    <Upload directTo="openPersonsPage"></Upload>
  </el-dialog>
</template>
<script>
import PageTitle from '@/components/PageTitle'
import Detail from './Detail'
import { Post, Delete } from '@/api/HttpClient'
import Upload from '@/components/persons/Upload'

export default {
  name: 'Studs',
  components: { Upload, Detail, PageTitle },
  data: function () {
    return {
      students: [],
      curPerson: {
        name: '张三'
      },
      dialogVisible: false,
      uploadDialog: false
    }
  },
  mounted () {
    this.queryStudents()
  },
  methods: {
    queryStudents () {
      const that = this
      Post('http://localhost:8001/persons/list', {}, function (response) {
        console.log(response)
        const data = response.data
        if (data.success) {
          that.students = data.data
        }
      })
    },
    upload () {
      this.uploadDialog = true
    },
    view () {
      this.dialogVisible = true
      console.log('查看')
    },
    edit () {
      this.dialogVisible = true
      console.log('编辑')
    },
    del () {
      this.dialogVisible = true
      console.log('删除')
      Delete('http://localhost:8001/persons/1', {
        personId: 1
      }, function (response) {
        console.log(response)
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
    openPersonsPage () {

    }
  }
}
</script>

<style scoped>
.table>tbody>tr>td {
  text-align: left;
}
</style>
