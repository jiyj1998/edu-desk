<template>
  <div class="page-title">
    <div class="title_left">
      <h3>{{ title }} <small></small></h3>
    </div>
    <div class="title_right">
      <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="需要什么？从这里搜索...">
          <span class="input-group-btn">
                      <button class="btn btn-default" type="button">搜!</button>
                    </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: String
  }
}
</script>

<style scoped>

</style>
