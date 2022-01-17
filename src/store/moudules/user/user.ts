import { AxiosError, AxiosResponse } from 'axios';
import { Login, Logout } from '../../../api/user/user';
import {
  ICurrentUserInfo,
  ILoginInfo,
  IUserState
} from '../../../interface/login';
import { ActionContext } from 'vuex';
import {
  getCookie,
  getCurrentUserInfo,
  removeCookie,
  removeCurrentUserInfo,
  setCookie,
  setCurrentUserInfo
} from '../../../utils/login';

const state: IUserState = {
  current_user_info: getCurrentUserInfo(),
  token: '',
  cookie: getCookie(),
  isLogin: getCookie() ? true : false
};

const getters = {};

const actions = {
  // login_status({ commit }: ActionContext<{}, {}>) {
  //   return new Promise((resolve, reject) => {
  //     loginStatus().then((res: AxiosResponse) => {
  //       resolve(res);
  //     }).catch((error: AxiosError) => {
  //       reject(error);
  //     });
  //   });
  // },

  login(
    { commit }: ActionContext<{}, {}>,
    loginInfo: ILoginInfo
  ): Promise<AxiosResponse | AxiosError> {
    return new Promise((resolve, reject) => {
      Login(loginInfo)
        .then((res: AxiosResponse) => {
          if (res.data.code === 200) {
            commit('SET_CURRENT_USER_INFO', res.data.profile);
            commit('SET_TOKEN', res.data.token);
            commit('SET_COOKIE', res.data.cookie.split('=')[1]);
            commit('UPDATE_ISLOGIN', true);
            setCurrentUserInfo(res.data.profile);
            setCookie(res.data.cookie);
          }
          resolve(res);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  logout({
    commit
  }: ActionContext<{}, {}>): Promise<AxiosResponse | AxiosError> {
    return new Promise((resolve, reject) => {
      Logout()
        .then((res: AxiosResponse) => {
          if (res.data.code === 200) {
            commit('SET_CURRENT_USER_INFO', {});
            commit('SET_TOKEN', '');
            commit('SET_COOKIE', '');
            commit('UPDATE_ISLOGIN', false);
            removeCurrentUserInfo();
            removeCookie();
          }
          resolve(res);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
};

const mutations = {
  SET_CURRENT_USER_INFO: (
    state: IUserState,
    current_user_info: ICurrentUserInfo
  ): void => {
    state.current_user_info = current_user_info;
  },
  SET_TOKEN: (state: IUserState, token: string): void => {
    state.token = token;
  },
  SET_COOKIE: (state: IUserState, cookie: string): void => {
    state.cookie = cookie;
  },
  UPDATE_ISLOGIN: (state: IUserState, isLogin: boolean): void => {
    state.isLogin = isLogin;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
