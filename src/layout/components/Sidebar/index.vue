<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="2" route="index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="3" route="table">
          <i class="el-icon-document"></i>
          <span slot="title">商品</span>
        </el-menu-item>
        <el-menu-item index="4" class="y-menu-item" route="sales">
          <el-popover
            placement="right-start"
            width="200"
            trigger="hover"
            v-model="visible"
          >
            <div class="menu-content">
              <div v-for="(item,index) in salesRouter" :key="index">
                <div class="title">{{ item.name }}</div>
                <div @click="goToPage(child)" v-for="(child,index) in item.children" :key="index" class="item-li">{{ child.name }}</div>
              </div>
            </div>
            <span class="hover-span" slot="reference">
              <i class="el-icon-setting"></i>销售
            </span>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
const { salesRouter } = require('@/layout/components/Sidebar/routerConfig')

// import variables from '@/styles/variables.scss'

export default {
  data() {
    return {
      visible: false,
      salesRouter: []
    }
  },
  components: { Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // variables() {
    //   return variables
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    console.log(salesRouter)
    this.salesRouter = salesRouter
  },
  methods: {
    goToPage(item) {
      console.log(item)
      this.visible = false
      this.$router.push(item.path)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    mouseenter() {
      console.log('移入')
    },
    mouseleave() {
      console.log('移chu')
    }
  }
}
</script>
<style lang="scss" scoped>
 ::v-deep{
   .el-menu-item{
     //border: 1px solid red;
     color: #FFFFFF;
     //padding: 0 !important;
     padding: 0;
   }
   .el-menu-item:hover{
     background: #1890FF;
   }
   .el-menu-item [class^=el-icon-]{
     color: #FFFFFF;
   }
   .el-menu{
     background: #051B30;
   }
   .el-menu--collapse>.el-menu-item span, .el-menu--collapse>.el-submenu>.el-submenu__title span{
     width: 44px;
     height: auto;
     overflow: hidden;
     visibility: visible;
     display: inline-block;
   }
 }
 .y-menu-item{
   padding: 0 !important;
 }
 .hover-span{
   display: inline-block;
   width: 100%;
   //border: 1px solid red;
   padding-left: 20px;
 }
 .menu-content{
   .title{
     font-size: 14px;
     font-family: PingFangSC-Regular, PingFang SC;
     font-weight: 400;
     color: #1890FF;
      margin: 10px 0;
   }
   .title::before{
     position: relative;
     top: 2px;
     content: "";
     display: inline-block;
     width: 3px;
     height: 14px;
     background: #1890FF;
     border-radius: 100px;
     margin-right: 8px;
   }
   .item-li{
     //border: 1px solid red;
     cursor: pointer;
     height: 32px;
     line-height: 32px;
     border-radius: 2px;
     text-align: center;
   }
   .item-li:hover{
     background: #EBEDF0;
   }
   .active-item-li{
     background: #EBEDF0;
   }
 }
</style>

<style>
  .el-popover{
    box-shadow: 4px 5px 8px 0px rgba(0, 0, 0, 0.06);
    border: 1px solid #91CAFF;
    width: 130px !important;
    margin: 0;
  }
  .el-popover .popper__arrow{
    display: none;
  }
</style>
