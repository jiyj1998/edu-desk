<template>
  <div >
    <PageTitle title="班级管理"/>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>班级列表</h2>
            <ul class="nav navbar-right panel_toolbox">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-list-alt"></i>{{ gradeBtnDesc }}</a>
                <ul class="dropdown-menu" role="menu">
                  <li v-for="(grade, index) in grades" :key="index" @click="selGrade(index)"><a href="#">{{ grade.gradeDesc }}</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" @click="add"><i class="fa fa-plus-square"></i>新增</a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <!-- start project list -->
            <table class="table table-striped projects">
              <thead>
              <tr>
                <th style="width: 1%">#</th>
                <th style="width: 20%">班级名称</th>
                <th>相关老师</th>
                <th>班级容量</th>
                <th>年级</th>
                <th style="width: 20%">#操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for=" (classOne, index) in classes" :key="index">
                <td>#{{ index+1 }}</td>
                <td>
                  <a>{{ classOne.className }}</a>
                </td>
                <td>
                  <ul class="list-inline">
                    <li v-for="(teacher, index) in classOne.teachers" :key="index">
                      <img :src="userImg" class="avatar" alt="Avatar" :title="teacher.name">
                    </li>
                  </ul>
                </td>
                <td class="project_progress">
                  <span>{{ classOne.studentNum }}/ {{ classOne.capacity }}</span>
                </td>
                <td>
                  <button type="button" class="btn btn-success btn-xs">1年级</button>
                </td>
                <td>
                  <a href="#" class="btn btn-info btn-xs" @click="edit(index)"><i class="fa fa-pencil"></i> 修改 </a>
                  <a href="#" :class="[{ 'btn-success': classOne.enableFlag == 8 }, 'btn', 'btn-default', 'btn-xs']" @click="enable(index)"><i class="fa fa-pencil"></i> {{ classOne.enableFlag == 8 ? '停用':'启用'}} </a>
                  <a href="#" class="btn btn-danger btn-xs" @click="del(index)"><i class="fa fa-trash-o"></i> 删除 </a>
                </td>
              </tr>
              </tbody>
            </table>
            <!-- end project list -->
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <el-dialog
      v-model="infoDiag"
      title="班级信息"
      width="50%"
    >
      <detail :curClass="curClass" :teacherArray="curClass.teachers" @closeDiag="closeDetailPage"></detail>
    </el-dialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { Post, Delete, Get } from '@/api/HttpClient'
import Detail from '@/components/classes/Detail'
import { ElMessage } from 'element-plus'

export default {
  name: 'Classes',
  components: { Detail, PageTitle },
  data: function () {
    return {
      grades: [],
      grade: {},
      classes: [],
      curClass: {},
      userImg: require('@/assets/images/user.png'),
      infoDiag: false,
      gradeBtnDesc: '年级'
    }
  },
  mounted () {
    this.queryClasses()
    this.queryGrades()
  },
  methods: {
    queryGrades () {
      const that = this
      Get('http://localhost:8001/classes/grades', {},
        function (response) {
          const data = response.data
          if (data.success) {
            that.grades = data.data
            if (that.grades.length > 0) {
              that.grade = that.grades[0]
              that.gradeBtnDesc = that.grade.gradeDesc
            }
            return
          }
          console.error('接口异常')
        })
    },
    queryClasses () {
      const that = this
      Post('http://localhost:8001/classes/list', {},
        function (response) {
          const data = response.data
          if (data.success) {
            that.classes = data.data
            return
          }
          console.error('接口异常')
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
    edit (index) {
      console.log('编辑班级信息')
      this.curClass = this.classes[index]
      this.curClass.grade = this.grade.grade
      this.infoDiag = true
    },
    del (index) {
      console.log('删除班级信息')
      this.curClass = this.classes[index]
      const that = this
      Delete('http://localhost:8001/classes/' + this.curClass.classId, {
      }, function (response) {
        if (response.data.success) {
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          that.queryClasses()
        }
      })
    },
    add () {
      this.infoDiag = true
      this.curClass = {}
      this.curClass.grade = this.grade.grade
    },
    closeDetailPage () {
      this.infoDiag = false
      this.queryClasses()
    },
    selGrade (index) {
      this.grade = this.grades[index]
    },
    enable (index) {
      const classObj = this.classes[index]
      const that = this
      Post('http://localhost:8001/classes/enable', classObj, function (response) {
        const data = response.data
        if (data.success) {
          ElMessage({
            showClose: true,
            message: '调整成功',
            type: 'success'
          })
          that.queryClasses()
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
.el-switch {
  vertical-align: top;
  margin-right: 10px;
}
.x_title a {
  color: #405467;
}
</style>
