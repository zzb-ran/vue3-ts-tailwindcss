import { createLogger, createStore } from 'vuex';
import user from './moudules/user/user';
import index from './moudules/home/index';
import recommend from './moudules/home/recommend';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    index,
    recommend
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
