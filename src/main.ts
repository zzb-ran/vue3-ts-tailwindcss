import { createApp } from 'vue';
import App from './App.vue';
import lazyPlugin from 'vue3-lazy';
import router from './router';
import store from './store';
import './css/index.css';
import loadingImg from './assets/loading.gif';
import errorImg from './assets/logo.png';

createApp(App)
  .use(lazyPlugin, {
    loading: loadingImg,
    error: errorImg
  })
  .use(router)
  .use(store)
  .mount('#app');
