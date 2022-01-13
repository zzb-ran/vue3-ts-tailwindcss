import { AxiosError, AxiosResponse } from 'axios';
import { IBanner, IHomeState } from '../../../interface/home/ihome';
import { ActionContext } from 'vuex';
import { banner } from '../../../api/home/ahome';

const state: IHomeState = {
  banners: [],
  className: [
    'w-2/4 h-full left-96 top-0 z-20',
    'w-2/6 h-80 right-80 top-8 z-10',
    'w-2/6 h-80 left-32 top-8 z-10'
  ]
};

const getters = {};

const actions = {
  banner({ commit }: ActionContext<{}, {}>): Promise<any> {
    return new Promise((resolve, reject) => {
      banner()
        .then((res: AxiosResponse) => {
          commit('SET_BANNERS', res.data.banners);
          resolve(res);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  updateClassName(
    { commit }: ActionContext<{}, {}>,
    className: string[]
  ): void {
    commit('UPDATE_CLASSNAME', className);
  }
};

const mutations = {
  SET_BANNERS: (state: IHomeState, banners: IBanner) => {
    state.banners = banners;
  },
  UPDATE_CLASSNAME: (state: IHomeState, className: string[]) => {
    state.className = className;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
