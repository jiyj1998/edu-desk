<template>
  <div class="login_container">
    <a class="hiddenanchor" id="signup"></a>
    <a class="hiddenanchor" id="signin"></a>
    <div class="login_wrapper">
      <div class="animate form login_form">
        <section class="login_content">
          <form>
            <h1>登录</h1>
            <div>
              <input type="text" class="form-control" placeholder="用户名" required="" v-model="userName"  @keyup.enter="login"/>
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" required="" v-model="password"  @keyup.enter="login"/>
            </div>
            <div>
              <a class="btn btn-default submit" @click="login">登录</a>
              <a class="reset_pass" href="#">忘记密码?</a>
            </div>
          </form>
        </section>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
  <footer class="footer">
    <div class="container">
      <h5>秀容中学</h5>
      <p>©2021 All Rights Reserved.</p>
    </div>
  </footer>
</template>
<script>

import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

export default {
  name: 'login',
  data: function () {
    return {
      userName: '',
      password: ''
    }
  },
  mounted () {
    console.log('初始化用户名')
    if (!localStorage.getItem('admin')) {
      console.log('初始化用户名')
      localStorage.setItem('user1', JSON.stringify({
        username: 'user1',
        passwd: md5('123456')
      }))
      localStorage.setItem('user2', JSON.stringify({
        username: 'user2',
        passwd: md5('123456')
      }))
      localStorage.setItem('admin', JSON.stringify({
        username: 'admin',
        passwd: md5('123$%^789')
      }))
    }
  },
  methods: {
    login: function () {
      const user = localStorage.getItem(this.userName)
      if (user && JSON.parse(user).passwd === md5(this.password)) {
        sessionStorage.setItem('username', this.userName)
        this.$router.push('/')
        return
      }
      ElMessage({
        showClose: true,
        message: '用户名或密码不对，请重新输入',
        type: 'warning'
      })
    }
  }
}
</script>
<style scoped="scoped">
.login_container {
  background: #F7F7F7!important;
}
</style>
