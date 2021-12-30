import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/yLogin',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/login1'),
    hidden: true
  },

  {
    path: '/login2',
    component: () => import('@/views/login/login2'),
    hidden: true
  },

  {
    path: '/forgetpswd',
    component: () => import('@/views/forgetpswd/index'),
    hidden: true
  },

  {
    path: '/forgetpswd2',
    component: () => import('@/views/forgetpswd/index2'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Index', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/form',
    children: [
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/table',
    children: [
      {
        path: 'table',
        name: '商品',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'form' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/sales',
    children: [
      {
        path: 'sales',
        name: '销售',
        component: () => import('@/views/tree/index'),
        meta: { title: '销售', icon: 'form' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/order1',
    children: [
      {
        path: 'order1',
        name: '订单管理1',
        component: () => import('@/views/order/page1'),
        meta: { title: '销售', icon: 'form' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/order2',
    children: [
      {
        path: 'order2',
        name: '订单管理2',
        component: () => import('@/views/order/page2'),
        meta: { title: '销售', icon: 'form' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/stock1',
    children: [
      {
        path: '/stock1',
        name: '备货管理1',
        component: () => import('@/views/stock/page1'),
        meta: { title: '销售', icon: 'form' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/stock2',
    children: [
      {
        path: 'stock2',
        name: '备货管理2',
        component: () => import('@/views/stock/page2'),
        meta: { title: '销售', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
