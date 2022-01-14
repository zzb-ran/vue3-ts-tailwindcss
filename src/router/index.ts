import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

export const homeMenuRoutes: RouteRecordRaw[] = [
  {
    path: 'index',
    name: 'Index',
    meta: { title: '主页', icon: '' },
    component: () => import('../views/home/Index.vue')
  },
  {
    path: 'recommend',
    name: 'Recommend',
    meta: { title: '每日推荐', icon: '' },
    component: () => import('../views/home/Recommend.vue')
  }
];

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', icon: '' },
    component: () => import('../views/home/Home.vue'),
    redirect: '/home/index',
    children: homeMenuRoutes
  },
  {
    path: '/home1',
    name: 'Home1',
    meta: { title: '首页1', icon: '' },
    component: () => import('../views/home/home1.vue')
  }
];

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Layout.vue'),
    redirect: '/home',
    children: menuRoutes
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/Login.vue')
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
