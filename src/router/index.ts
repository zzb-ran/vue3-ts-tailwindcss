import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    meta: { title: '首页', icon: '' },
    component: () => import('../views/home/home.vue')
  },
  {
    path: 'home1',
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
    redirect: 'home',
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
