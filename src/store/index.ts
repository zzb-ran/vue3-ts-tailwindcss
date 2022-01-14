import { createLogger, createStore } from 'vuex';
import user from './moudules/user/user';
import index from './moudules/home/index';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    index
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
