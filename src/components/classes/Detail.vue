<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <form class="form-horizontal form-label-left">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">名称</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="请输入班级名称" v-model="classObj.className">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">容量</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="classObj.capacity"  placeholder="请输入班级容量">
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-6">
        <div class="teacher-list">
          <el-scrollbar max-height="400px">
            <el-tag v-for="(teacher, index) in teachers" :key="index" closable type="success" @close="removeTeacher(index)">
              {{teacher.name}}
            </el-tag>
            <el-tooltip
              class="item"
              effect="dark"
              content="选择班级相关老师"
              placement="top"
            >
              <el-button class="button-new-tag" size="small" @click="addPerson">+ 选择</el-button>
            </el-tooltip>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
        <button type="button" class="btn btn-primary" @click="reset">重置</button>
        <button type="button" class="btn btn-success" @click="save">保存</button>
      </div>
    </div>
    <el-dialog
      v-model="transferDial"
      title="选择老师"
      width="50%"
    >
      <div style="text-align: center">
        <el-transfer
          v-model="selectedTeachersIndexArray"
          style="text-align: left; display: inline-block"
          filterable
          filter-placeholder="搜索老师名字"
          :render-content="renderFunc"
          :left-default-checked="[]"
          :right-default-checked="selectedTeachersIndexArray"
          :titles="['所有', '已选']"
          :button-texts="['向左', '向右']"
          :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
          :data="allTeachesTemplate"
          @change="handleChange"
        >
          <template #default="{ option }">
            <span>{{ option.key }} - {{ option.label }}</span>
          </template>
        </el-transfer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Post } from '@/api/HttpClient'
import { ElMessage } from 'element-plus'

export default {
  name: 'detail',
  props: {
    curClass: Object,
    teacherArray: Array
  },
  data () {
    return {
      classObj: {
        className: '',
        capacity: 50
      },
      transferDial: false,
      teachers: [],
      allTeachers: [],
      allTeachesTemplate: [],
      selectedTeachersIndexArray: [],
      renderFunc (h, option) {
        return h('span', null, option.label)
      }
    }
  },
  watch: {
    curClass: {
      deep: true,
      immediate: true,
      handler (newObj) {
        this.classObj = newObj
      }
    },
    teacherArray: {
      deep: true,
      immediate: true,
      handler (newObj, oldVal) {
        console.log(oldVal, 'teachers')
        this.teachers = newObj
      }
    }
  },
  mounted () {
    this.queryStudents()
  },
  methods: {
    queryStudents (searchContent) {
      console.log('searchContent: {}', searchContent)
      const data = {}
      data.keyWord = searchContent
      data.role = 4
      const that = this
      Post('http://localhost:8001/persons/list', data, function (response) {
        console.log(response)
        const data = response.data
        if (data.success) {
          that.allTeachers = data.data
          for (let i = 0; i < data.data.length; i++) {
            const teacher = data.data[i]
            that.allTeachesTemplate.push({
              key: i,
              label: teacher.name,
              disabled: false
            })
          }
        }
      })
    },
    reset () {
      this.classObj = {}
    },
    save () {
      if (this.classObj.className === '') {
        return
      }
      const that = this
      this.classObj.teachers = this.teachers
      Post('http://localhost:8001/classes/save', this.classObj, function (response) {
        const data = response.data
        if (data.success) {
          ElMessage({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          that.$emit('closeDiag')
        }
      })
    },
    removeTeacher (index) {
      this.teachers.splice(index, 1)
    },
    addPerson () {
      console.log('新增老师')
      this.transferDial = true
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
      this.teachers.splice(0, this.teachers.length)
      for (let i = 0; i < value.length; i++) {
        this.teachers.push(this.allTeachers[i])
      }
    }
  }
}
</script>
<style scoped>
.teacher-list .el-scrollbar {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
.teacher-list .el-tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
