import { createLogger, createStore } from 'vuex';
import user from './moudules/user/user';
import home from './moudules/home/home';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    home
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
