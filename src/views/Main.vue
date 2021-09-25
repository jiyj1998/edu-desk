<template>
  <div class="container body">
    <div class="main_container">
      <sidebar navClass="nav-sm" @changeModule="changeModule"/>
      <!-- top navigation -->
      <top-nav  @changeModule="changeModule"/>
      <!-- /top navigation -->
      <!-- page content -->
      <div class="right_col" role="main">
        <component :is="currentModule" />
      </div>
      <!-- /page content -->

      <!-- footer content -->
      <footer>
        <div class="pull-right">
          Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
        </div>
        <div class="clearfix"></div>
      </footer>
      <!-- /footer content -->
    </div>
  </div>
</template>
<script>
import '@/assets/js/custom'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import Classes from '@/components/classes/Classes'
import Studs from '@/components/persons/Studs'
import Settings from '@/components/Settings'
import Profile from '@/components/Profile'

export default {
  components: { Sidebar, TopNav, Classes, Studs, Settings, Profile },
  data: function () {
    return {
      menuSize: 'sm',
      currentModule: 'studs'
    }
  },
  methods: {
    changeModule: function (module) {
      console.log('clicked: ' + module)
      this.currentModule = module.substring(0, 1).toUpperCase() + module.substring(1)
    }
  }
}
</script>
