import { AxiosError, AxiosResponse } from 'axios';
import { Login, Logout } from '../../../api/user/user';
import { ICurrentUserInfo, ILoginInfo, IUserState } from '../../../interface/user/login';
import { ActionContext } from 'vuex';
import {
  getCookie, getCurrentUserInfo, removeCookie, removeCurrentUserInfo, setCookie, setCurrentUserInfo
} from '../../../utils/auth';

const state: IUserState = {
  current_user_info: getCurrentUserInfo(),
  token: '',
  cookie: getCookie()
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

  login({ commit }: ActionContext<{}, {}>, loginInfo: ILoginInfo) {
    return new Promise((resolve, reject) => {
      Login(loginInfo).then((res: AxiosResponse) => {
        console.log(res);
        if (res.data.code === 200) {
          commit('SET_CURRENT_USER_INFO', res.data.profile);
          commit('SET_TOKEN', res.data.token);
          commit('SET_COOKIE', res.data.cookie);
          setCurrentUserInfo(res.data.profile);
          setCookie(res.data.cookie);
        }
        resolve(res);
      }).catch((error: AxiosError) => {
        reject(error);
      });
    });
  },

  logout({ commit }: ActionContext<{}, {}>) {
    return new Promise((resolve, reject) => {
      Logout().then((res: AxiosResponse) => {
        console.log(res);
        if (res.data.code === 200) {
          commit('SET_CURRENT_USER_INFO', {});
          commit('SET_TOKEN', '');
          commit('SET_COOKIE', '');
          removeCurrentUserInfo();
          removeCookie();
        }
        resolve(res);
      }).catch((error: AxiosError) => {
        reject(error);
      });
    });
  }
};

const mutations = {
  SET_CURRENT_USER_INFO: (state: IUserState, current_user_info: ICurrentUserInfo) => {
    state.current_user_info = current_user_info;
  },
  SET_TOKEN: (state: IUserState, token: string) => {
    state.token = token;
  },
  SET_COOKIE: (state: IUserState, cookie: string) => {
    state.cookie = cookie;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
