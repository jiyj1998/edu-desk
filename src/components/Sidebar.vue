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
            <li :class="{active: activeMenu == 'classes'}"><a @click="menus('classes')"><i class="fa fa-columns"></i> 班级 <span class="fa fa-chevron-right"></span></a>
            </li>
            <li :class="{active: activeMenu == 'studs'}"><a @click="menus('studs')"><i class="fa fa-users"></i> 学生 <span class="fa fa-chevron-right"></span></a>
            </li>
          </ul>
        </div>
        <div class="menu_section">
          <h3>实时</h3>
          <ul class="nav side-menu">
            <li :class="{active: activeMenu == 'charts'}"><a @click="menus('charts')"><i class="fa fa-bar-chart"></i> 汇总 <span class="fa fa-chevron-right"></span></a>
            </li>
          </ul>
        </div>

      </div>
      <!-- /sidebar menu -->

      <!-- /menu footer buttons -->
      <div class="sidebar-footer hidden-small">
        <a @click="menus('settings')" data-toggle="tooltip" data-placement="top" title="Settings">
          <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="FullScreen" @click="isScreenFull">
          <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
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
import screenfull from 'screenfull'

export default {
  name: 'Sidebar',
  props: {
    navClass: String
  },
  data: function () {
    return {
      user: {
        img: require('@/assets/images/img.jpg')
      },
      isFullscreen: false,
      activeMenu: ''
    }
  },
  methods: {
    menus (module) {
      this.activeMenu = module
      this.$emit('changeModule', module)
    },
    isScreenFull () {
      console.log('全屏')
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器版本过低 不支持全屏显示！',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped>
.navbar a, .side-menu a, .menu_section h3 {
  text-align: left;
}
</style>
