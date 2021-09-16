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
                <input type="text" class="form-control" disabled="disabled" placeholder="">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">原密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" value="12lkjlj">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">新密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" value="passwordonetwo">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">确认密码</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <input type="password" class="form-control" value="passwordonetwo">
              </div>
            </div>
            <div class="ln_solid"></div>
            <div class="form-group">
              <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                <button type="reset" class="btn btn-primary">重置</button>
                <button type="submit" class="btn btn-success">确认</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>

</style>
