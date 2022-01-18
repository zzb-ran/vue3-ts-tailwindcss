import { createLogger, createStore } from 'vuex';
import user from './moudules/user/user';
import index from './moudules/home/index';
import recommend from './moudules/home/recommend';
import play from './moudules/play/play';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    index,
    recommend,
    play
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
