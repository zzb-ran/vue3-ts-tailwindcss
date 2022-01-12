import { createLogger, createStore } from 'vuex';
import user from './moudules/user/user';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});