import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../components/home.vue')
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
