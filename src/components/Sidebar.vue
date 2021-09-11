<template>
  <div class="col-md-3 left_col menu_fixed">
    <div class="left_col scroll-view">
      <div class="navbar nav_title" style="border: 0;">
        <a href="index.html" class="site_title"><i class="fa fa-yelp"></i> <span>AirNab</span></a>
      </div>

      <div class="clearfix"></div>

      <!-- menu profile quick info -->
      <div class="profile clearfix">
        <div class="profile_pic">
          <img :src="user.img" alt="..." class="img-circle profile_img">
        </div>
        <div class="profile_info">
          <span>您好，</span>
          <h2>欢迎使用</h2>
        </div>
      </div>
      <!-- /menu profile quick info -->

      <br />

      <!-- sidebar menu -->
      <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
          <h3>基础</h3>
          <ul class="nav side-menu">
            <li><a @click="menus('classes')"><i class="fa fa-columns"></i> 所有班级 <span class="fa fa-chevron-left"></span></a>
            </li>
            <li><a @click="menus('studs')"><i class="fa fa-users"></i> 学生 <span class="fa fa-chevron-down"></span></a>
            </li>
          </ul>
        </div>
        <div class="menu_section">
          <h3>实时</h3>
          <ul class="nav side-menu">
            <li><a @click="menus('charts')"><i class="fa fa-bar-chart"></i> 汇总 <span class="fa fa-chevron-down"></span></a>
            </li>
          </ul>
        </div>

      </div>
      <!-- /sidebar menu -->

      <!-- /menu footer buttons -->
      <div class="sidebar-footer hidden-small">
        <a href="setting.html" data-toggle="tooltip" data-placement="top" title="Settings">
          <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="FullScreen">
          <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Lock">
          <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
          <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
        </a>
      </div>
      <!-- /menu footer buttons -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    navClass: String
  },
  data: function () {
    return {
      user: {
        img: require('@/assets/images/img.jpg')
      }
    }
  },
  methods: {
    menus (module) {
      this.$emit('changeModule', module)
    }
  }
}
</script>

<style scoped>
.navbar a, .side-menu a, .menu_section h3 {
  text-align: left;
}
</style>
