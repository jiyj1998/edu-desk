<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>个人中心 <small>修改密码</small></h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <br />
          <form class="form-horizontal form-label-left">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">用户名</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="text" class="form-control" disabled="disabled" placeholder="" v-model="userName">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">原密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" v-model="originPassword">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">新密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" v-model="newPassword1"  @blur="checkPassword">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">确认密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" v-model="newPassword2" @blur="checkPassword">
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                <button type="button" class="btn btn-primary" @click="reset">重置</button>
                <button type="button" class="btn btn-success" @click="changePassord">确认</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

export default {
  name: 'Profile',
  data: function () {
    return {
      userName: '',
      originPassword: '',
      newPassword1: '',
      newPassword2: '',
      checkResult: false
    }
  },
  mounted () {
    this.userName = sessionStorage.getItem('username')
  },
  methods: {
    reset () {
      this.originPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
    },
    checkPassword () {
      if (this.newPassword2 === '') {
        return
      }
      if (this.newPassword1 !== this.newPassword2) {
        ElMessage({
          showClose: true,
          message: '两次输入新密码不一致，请重新输入',
          type: 'warning'
        })
        this.checkResult = false
        return
      }
      this.checkResult = true
    },
    changePassord () {
      if (!this.checkResult) {
        ElMessage({
          showClose: true,
          message: '两次输入新密码不一致，请重新输入',
          type: 'warning'
        })
        return
      }
      const user = JSON.parse(localStorage.getItem(this.userName))
      if (user.passwd !== md5(this.originPassword)) {
        ElMessage({
          showClose: true,
          message: '原始密码不正确，请重新输入',
          type: 'warning'
        })
        return
      }
      user.passwd = md5(this.newPassword1)
      localStorage.setItem(this.userName, JSON.stringify(user))
      ElMessage({
        showClose: true,
        message: '密码修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
