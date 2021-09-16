<template>
  <div >
    <PageTitle title="all Classes"/>
    <div class="row">
      <div class="col-md-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Classes</h2>
            <ul class="nav navbar-right panel_toolbox">
              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
              </li>
              <li><a class="collapse-link"><i class="fa fa-rotate-left"></i></a>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-list-alt"></i></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">1年级</a>
                  </li>
                  <li><a href="#">2年级</a>
                  </li>
                  <li><a href="#">3年级</a>
                  </li>
                  <li><a href="#">4年级</a>
                  </li>
                  <li><a href="#">5年级</a>
                  </li>
                </ul>
              </li>
              <li><a class="close-link"><i class="fa fa-close"></i></a>
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
              <tr v-for=" (classOne, classId) in classes" :key="classId">
                <td>#{{ classId+1 }}</td>
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
                  <div class="progress progress_sm">
                    <div class="progress-bar bg-green" role="progressbar" :aria-valuenow="classOne.studentNum" aria-valuemin="0" :aria-valuemax="100" style="width: 60%;">
                      <span class="sr-only">60% Complete</span>
                    </div>
                  </div>
<!--                  <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" data-transitiongoal="57"></div>
                  </div>-->
                </td>
                <td>
                  <button type="button" class="btn btn-success btn-xs">1年级</button>
                </td>
                <td>
                  <a href="#" class="btn btn-primary btn-xs" @click="viewClassOne"><i class="fa fa-folder"></i> View </a>
                  <a href="#" class="btn btn-info btn-xs" @click="editClassOne"><i class="fa fa-pencil"></i> Edit </a>
                  <a href="#" class="btn btn-danger btn-xs" @click="delClassOne"><i class="fa fa-trash-o"></i> Delete </a>
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
      :title="curClass.className"
      v-model="dialogVisible"
      width="100%"
      fullscreen="false"
      :before-close="handleClose"
    >
      <detail></detail>
      <template #footer>
    <span class="dialog-footer">
      <a href="#" class="btn btn-default btn-sm" @click="dialogVisible = false"> 取消 </a>
      <a href="#" class="btn btn-info btn-sm" @click="dialogVisible = false"> 确定 </a>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import axios from 'axios'
import Detail from '@/components/classes/Detail'

export default {
  name: 'Classes',
  components: { Detail, PageTitle },
  data: function () {
    return {
      classes: [],
      curClass: {},
      userImg: require('@/assets/images/user.png'),
      dialogVisible: false
    }
  },
  mounted () {
    this.queryClasses()
  },
  methods: {
    // Progressbar
    queryClasses () {
      const that = this
      axios.post('http://localhost:8001/classes/list', {})
        .then(function (response) {
          console.log(response)
          const data = response.data
          if (data.success) {
            that.classes = data.data
            return
          }
          console.error('接口异常')
        })
        .catch(function (error) {
          console.log(error)
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
    viewClassOne () {
      console.log('查看班级信息')
      this.curClass = this.classes[0]
      this.dialogVisible = true
    },
    editClassOne () {
      console.log('编辑班级信息')
      this.curClass = this.classes[0]
      this.dialogVisible = true
    },
    delClassOne () {
      console.log('删除班级信息')
      this.curClass = this.classes[0]
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.table>tbody>tr>td {
  text-align: left;
}
</style>
