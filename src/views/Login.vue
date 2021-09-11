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
              <input type="text" class="form-control" placeholder="用户名" required="" />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="密码" required="" />
            </div>
            <div>
              <a class="btn btn-default submit" href="index.html">登录</a>
              <a class="reset_pass" href="#">忘记密码?</a>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <div class="clearfix"></div>
              <br />
              <div>
                <h1>developing!</h1>
                <p>©2021 All Rights Reserved. jiyangjin@yeah.net</p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'login'
}
</script>
<style scoped="scoped">
.login_container {
  background: #F7F7F7!important;
}
</style>
