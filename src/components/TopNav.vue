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
              <img :src="user.img" alt="">admin
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li>
                <a @click="menus('profile')"> 修改密码</a>
              </li>
              <li>
                <a @click="menus('settings')">
                  <span class="badge bg-red pull-right"></span>
                  <span>设置</span>
                </a>
              </li>
              <li><a href="javascript:;">Help</a></li>
              <li><a href="#" @click="logout"><i class="fa fa-sign-out pull-right"></i> 注销</a></li>
            </ul>
          </li>

          <li role="presentation" class="dropdown notices">
            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false" @click="showNotice">
              <i class="fa fa-envelope-o"></i>
              <span :class="[{'bg-red': notices.length > 0}, 'badge']">{{ notices.length }}</span>
            </a>
            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
              <li v-for="(notice, index) in notices" :key="index" :class="{Info: notice.level == 'info',Warning: notice.level == 'warning',Danger: notice.level == 'error'}">
                <a @click="confirm(index)">
                  <span class="image"><img :src="userImg" alt="Profile Image" /></span>
                  <span>
                    <span>{{ notice.name }}</span>
                    <span class="time">{{ notice.timeDiff }}</span>
                  </span>
                  <span class="message">
                     {{ notice.message }}
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { createSocket } from '@/api/websocket'
import { ElMessage } from 'element-plus'

export default {
  name: 'Topnav',
  data: function () {
    return {
      user: {
        img: require('@/assets/images/img.jpg')
      },
      userImg: require('@/assets/images/user.png'),
      notices: []
    }
  },
  mounted () {
    const that = this
    createSocket('ws://localhost:8001/notices')
    window.addEventListener('onmessageWS', function (e) {
      try {
        const notice = JSON.parse(e.detail.data)
        console.log(notice)
        that.notices.push(notice)
        ElMessage({
          showClose: true,
          message: notice.name + '的' + notice.message,
          type: notice.level
        })
      } catch (e) {
      }
    })
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
    },
    menus (module) {
      this.$emit('changeModule', module)
    },
    calcTimeDiff () {
      for (let i = 0; i < this.notices.length; i++) {
        const timeStamp = this.notices[i].timeStamp
        this.notices[i].timeDiff = this.diffTime(timeStamp)
      }
    },
    diffTime (dateTimeStamp) {
      console.log(dateTimeStamp)
      const minute = 1000 * 60
      const hour = minute * 60
      const day = hour * 24
      const month = day * 30

      const now = new Date().getTime()
      console.log(now)
      const diffValue = now - dateTimeStamp

      const monthC = diffValue / month
      console.log(parseInt(monthC))
      const dayC = diffValue / day
      console.log(dayC)
      const hourC = diffValue / hour
      console.log(hourC)
      const minC = diffValue / minute
      console.log(minC)
      if (parseInt(monthC) >= 1) {
        return parseInt(monthC) + '个月前'
      } else if (parseInt(dayC) > 1) {
        return parseInt(dayC) + '天前'
      } else if (parseInt(dayC) === 1) {
        return '昨天'
      } else if (parseInt(hourC) >= 1) {
        return parseInt(hourC) + '小时前'
      } else if (parseInt(minC) >= 1) {
        return parseInt(minC) + '分钟前'
      } else {
        return '刚刚'
      }
    },
    showNotice () {
      this.calcTimeDiff()
    },
    confirm (index) {
      console.log(index)
      this.notices.splice(index, 1)
    },
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.Info {
  background-color: #909399;
}
.Warning {
  background-color: #E6A23C;
}
.Danger {
  background-color: #F56C6C;
}
.msg_list span {
  color: #fff;
  font-weight: 600;
}
</style>
