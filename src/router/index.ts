import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

export const homeMenuRoutes: RouteRecordRaw[] = [
  {
    path: 'recommend',
    name: 'Recommend',
    meta: { title: '每日推荐', icon: '' },
    component: () => import('../views/home/recommend.vue')
  },
  {
    path: 'rank',
    name: 'Rank',
    meta: { title: '排行', icon: '' },
    component: () => import('../views/home/rank.vue')
  }
];

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', icon: '' },
    component: () => import('../views/home/home.vue'),
    redirect: '/home/recommend',
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
      import(/* webpackChunkName: "home" */ '../views/layout.vue'),
    redirect: '/home',
    children: menuRoutes
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/login.vue')
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
