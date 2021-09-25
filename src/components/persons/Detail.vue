<template>
  <div class="row">
    <div class="col-md-9 col-xs-12">
      <div class="x_content">
        <br />
        <form class="form-horizontal form-label-left">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">姓名</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" placeholder="请输入姓名" v-model="person.name" v-if="actionFlag=='edit'">
              <input type="text" class="form-control" placeholder="请输入姓名" v-model="person.name" readonly v-else>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">身份证</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="person.personSerial" @blur="checkID" placeholder="请输入身份证号" v-if="actionFlag=='edit'">
              <input type="text" class="form-control" v-model="person.personSerial" @blur="checkID" placeholder="请输入身份证号" readonly v-else>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">年龄（岁）</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="person.age" :readonly="ageAndSexDisable" placeholder="请输入数字">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">性别</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="form-control" v-model="person.sex" :disabled="ageAndSexDisable">
                <option value="2">男</option>
                <option value="3">女</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">地址</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="person.address" placeholder="请输入住址" v-if="actionFlag=='edit'">
              <input type="text" class="form-control" v-model="person.address" placeholder="请输入住址" readonly v-else>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">班级</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="form-control" v-model="classObj.classId" v-if="actionFlag=='edit'">
                <option v-for="(classOne, index) in classArray" :key="index" :value="classOne.classId">{{ classOne.className }}</option>
              </select>
              <input type="text" class="form-control" v-model="classObj.className" v-else readonly>
            </div>
          </div>
          <div class="ln_solid"></div>
          <div class="form-group">
            <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
              <button type="button" class="btn btn-primary" v-if="actionFlag=='edit'" @click="reset">重置</button>
              <button type="button" class="btn btn-success" v-if="actionFlag=='edit'" @click="save">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Post } from '@/api/HttpClient'
import { ElMessage } from 'element-plus'

export default {
  name: 'Detail',
  props: {
    personObj: Object,
    curClass: Object,
    action: String,
    classArray: Array
  },
  data: function () {
    return {
      person: {},
      classObj: {},
      ageAndSexDisable: true,
      actionFlag: 'edit'
    }
  },
  watch: {
    personObj: {
      deep: true,
      immediate: true,
      handler (newObj) {
        this.person = newObj
      }
    },
    curClass: {
      deep: true,
      immediate: true,
      handler (newObj) {
        this.classObj = JSON.parse(JSON.stringify(newObj))
      }
    },
    action: {
      deep: true,
      immediate: true,
      handler (newObj) {
        this.actionFlag = newObj
      }
    }
  },
  methods: {
    checkID () {
      if (this.person.personSerial === '') {
        return
      }
      const that = this
      Post('http://localhost:8001/persons/checkPersonID', this.person, function (response) {
        console.log(response)
        const data = response.data
        if (data.success) {
          if (data.data == null) {
            ElMessage.error({
              message: '身份证号码不正确',
              type: 'error'
            })
            return
          }
          that.person.sex = data.data.sex
          that.person.age = data.data.age
        }
      })
    },
    reset () {
      this.person = {}
    },
    save () {
      if (this.person.name === '') {
        return
      }
      this.person.classId = this.classObj.classId
      const that = this
      Post('http://localhost:8001/persons/save', this.person, function (response) {
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
    }
  }
}
</script>

<style scoped>

</style>
