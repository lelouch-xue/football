import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

// in development-env not use lazy-loading,
// because lazy-loading too many pages will cause webpack hot update too slow.
// so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '@/layout/Layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
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
  { path: '/redirect', component: () => import('@/views/redirect'), hidden: true },
  { path: '/login/:token', component: () => import('@/views/login'), hidden: true },
  { path: '/login/:token/:from', component: () => import('@/views/login'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // [[[ 不需要再菜单栏展示的
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Home',
        redirect: '/enterprise',
        component: () => import('@/views/home/index'),
        meta: { title: '主页', icon: 's-home' }
      }
    ]
  },
  // ]]]
  {
    path: '/enterprise',
    component: Layout,
    children: [
      {
        path: '',
        name: 'EnterpriseList',
        component: () => import('@/views/enterprise/list'),
        meta: { title: '企业列表', icon: 'fas city' }
      },
      {
        path: 'init',
        name: 'EnterpriseInitialize',
        hidden: true,
        component: () => import('@/views/enterprise/initialize')
      },
      {
        path: ':id',
        name: 'ChooseEnterprise',
        hidden: true,
        component: () => import('@/views/enterprise/choose')
      }
    ]
  }
];

/**
 * 动态路由
 * @returns {Array}
 */
export const asyncRoutes = function () {
  const isSuperAdmin = store.getters.isSuperAdmin;
  const isAdmin = store.getters.isAdmin;
  const isSubject = store.getters.isSubject;
  const isEmployee = store.getters.isEmployee;

  const routes = [
    // [[[ 不需要再菜单栏展示的
    {
      path: '/',
      component: Layout,
      hidden: true,
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: () => (isAdmin ? import('@/views/enterprise/profile') : isSubject ? import('@/views/holder/profile') : import('@/views/employee/profile')),
          meta: { title: '账号设置', icon: 's-home' }
        }
      ]
    }
    // ]]]
  ];

  // 超级管理员
  if (isAdmin && isSuperAdmin) {
    routes.push(
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: 'manager',
            name: 'Manager',
            component: () => import('@/views/account/manager'),
            meta: { title: '管理员设置', icon: 'fas users-cog' }
          }
        ]
      }
    );
  }

  // 选择企业后, 加载
  if (store.getters.enterprise.id) {
    routes.push(
      // [[[ 不需要再菜单栏展示的
      {
        path: '/',
        component: Layout,
        hidden: true,
        children: [
          {
            path: 'message',
            name: 'Message',
            component: () => (isAdmin || isSubject ? import('@/views/enterprise/message') : import('@/views/employee/message')),
            meta: { title: '消息列表', icon: 's-home' }
          }
        ]
      }
      // ]]]
    );

    if (isAdmin || isEmployee) {
      routes.push(
        {
          path: '/overview',
          component: Layout,
          children: [
            {
              path: '',
              name: 'Overview',
              component: () => (isAdmin ? import('@/views/enterprise/overview') : import('@/views/employee/overview')),
              meta: { title: '概览', icon: 'fas chart-area' }
            }
          ]
        }
      );
    }
  }

  // 超级管理员或者管理员
  if (isAdmin || isSuperAdmin) {
    routes.push(
      {
        path: '/recommend',
        component: Layout,
        children: [
          {
            path: '',
            name: 'Recommend',
            component: () => (isAdmin || isSuperAdmin ? import('@/views/recommend/index') : import('@/views/recommend/index')),
            meta: { title: '智能推荐', icon: 'fas thumbs-up' }
          }
        ]
      }
    );
  }
  return routes;
};

const createRouter = () => new Router({
  // require service support
  mode: 'history',
  scrollBehavior: () => {
    return { y: 0 };
  },
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
