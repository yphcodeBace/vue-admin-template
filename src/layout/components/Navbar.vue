<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
<!--    <div class="header-left">-->
<!--      <i class="el-icon-service" />-->
<!--      客户服务-->
<!--    </div>-->
    <div class="right-menu">
      <div class="service">
        <i class="el-icon-service" />
        客户服务
      </div>
      <el-badge is-dot class="badge">
        <i class="el-icon-bell" />
      </el-badge>
<!--      <span class="notification"></span>-->
      <el-dropdown @command="selectFun">
        <span class="el-dropdown-link">
          {{ title }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
<!--      <el-avatar @click.native="logout"> 退出 </el-avatar>-->
    </div>
    <div class="title-list">
      <div class="list">
        <div v-for="(item,index) in openPages" :key="index" :class="activePath===item.path ? 'active-item' : ''" class="item" @click="changePage(item)">{{ item.name }}<i class="el-icon-close" @click.stop="_close(item,index)" /></div>
        <!--        <div class="item active-item">标题1 <i @click="_close" class="el-icon-close"></i></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      activePath: null,
      title: '台州市路桥瑞康家庭用品厂',
      levelList: [],
      openPages: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      console.log(this.$route.matched)
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }

      const current = matched.find(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      this.activePath = current.path
      const result = this.openPages.some(item => item.path === current.path)
      console.log(result)
      if (result) { // 如果存在do something
        // this.$message.success('打开该页面！')
      } else {
        this.openPages.push({
          name: current.name,
          path: current.path
        })
      }
      console.log(this.openPages)
    },
    _close(item, index) {
      console.log(item, index)
      this.openPages.splice(index, 1)
      if (item.path === this.activePath) {
        const index = this.openPages.length - 1
        this.$router.push(this.openPages[index].path)
      }
    },

    changePage(item, index) {
      this.$router.push(item.path)
    },

    selectFun(item) {
      console.log(item)
      // this.title = item
      if (item === '1') { // 修改密码
        this.$router.push('forgetpswd')
      } else { // 退出登陆
        this.logout()
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      console.log('退出！')
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.service{
  cursor: pointer;
  display: inline-block;
  margin-right: 30px;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6A6C6D;
}
.badge{
  //border: 1px solid red;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  margin-right: 10px;
  ::v-deep{
    .el-badge__content.is-dot{
      right: 8px;
      top: 3px;
      width: 10px;
      height: 10px;
    }
  }
}
.navbar {
  //height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .header-left{
    float: left;
    //border: 1px solid red;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6A6C6D;
  }

  .right-menu {
    ::v-deep{
      .el-avatar{
        cursor: pointer;
        float: right;
        margin: 5px 0 0 10px;
      }
    }
    //border: 1px solid red;
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-dropdown-link, .notification{
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6A6C6D;
}
.notification{
  margin: 0 48px 0 10px;
}
.el-dropdown-link{
  cursor: pointer;
}
.title-list{
  clear: both;
  background: #EEEEEE;
  padding: 8px;
}
.list{
  height: 53px;
  background: #fff;
  display: flex;
  align-items: center;
  .item{
    cursor: pointer;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C8C8C;
    margin: 0 10px;
    padding-right: 20px;
    border-right: 1px solid #D8D8D8;
  }
  .active-item{
    background: #1890FF;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    border: none;
    padding: 2px 12px;
    border-radius: 2px;
  }
  .item:hover{
    .el-icon-close{
      background: #f0f2f5;
      padding: 2px;
      border-radius: 50%;
    }
  }
  .active-item:hover{
    .el-icon-close{
      background: #FFFFFF;
      color: grey;
      padding: 2px;
      border-radius: 50%;
    }
  }
  .el-icon-close{
    margin-left: 10px;
  }
  //.el-icon-close:hover{
  //  background: #f0f2f5;
  //  padding: 2px;
  //  border-radius: 50%;
  //}
}
</style>
