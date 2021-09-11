<template>
  <div class="top_nav">
    <div class="nav_menu">
      <nav>
        <div class="nav toggle">
          <a id="menu_toggle" @click="toggleMenu"><i class="fa fa-bars"></i></a>
        </div>

        <ul class="nav navbar-nav navbar-right">
          <li class="">
            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <img :src="user.img" alt="">John Doe
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li><a href="profile.html"> Profile</a></li>
              <li>
                <a href="setting.html">
                  <span class="badge bg-red pull-right">50%</span>
                  <span>Settings</span>
                </a>
              </li>
              <li><a href="javascript:;">Help</a></li>
              <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
            </ul>
          </li>

          <li role="presentation" class="dropdown">
            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-envelope-o"></i>
              <span class="badge bg-green">6</span>
            </a>
            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
              <li>
                <a>
                  <span class="image"><img :src="user.img" alt="Profile Image" /></span>
                  <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                  <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image"><img :src="user.img" alt="Profile Image" /></span>
                  <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                  <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image"><img :src="user.img" alt="Profile Image" /></span>
                  <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                  <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                </a>
              </li>
              <li>
                <a>
                  <span class="image"><img :src="user.img" alt="Profile Image" /></span>
                  <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                  <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                </a>
              </li>
              <li>
                <div class="text-center">
                  <a>
                    <strong>See All Alerts</strong>
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topnav',
  data: function () {
    return {
      user: {
        img: require('@/assets/images/img.jpg')
      }
    }
  },
  methods: {
    toggleMenu: function () {
      console.log('clicked - menu toggle')
      if (window.document.body.classList.contains('nav-md')) {
        window.document.body.classList.replace('nav-md', 'nav-sm')
        this.menuSize = 'sm'
        return
      }
      window.document.body.classList.replace('nav-sm', 'nav-md')
      this.menuSize = 'md'
    }
  }
}
</script>

<style scoped>

</style>
