import { AxiosError, AxiosResponse } from 'axios';
import {
  IBanner,
  IHomeState,
  IRecommendResource,
  IRecommendSong
} from '../../../interface/home';
import { ActionContext } from 'vuex';
import { banner } from '../../../api/home';

const state: IHomeState = {
  banners: [],
  className: [
    'w-2/4 h-full left-96 top-0 z-20',
    'w-2/6 h-80 right-80 top-8 z-10',
    'w-2/6 h-80 left-32 top-8 z-10'
  ],
  recommendResourceList: [],
  recommendSongsList: []
};

const getters = {};

const actions = {
  banner({
    commit
  }: ActionContext<{}, {}>): Promise<AxiosResponse | AxiosError> {
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
  },

  recommendResourceList(
    { commit }: ActionContext<{}, {}>,
    recommendResourceList: IRecommendResource[]
  ): void {
    commit('SET_RECOMMENDRESOURCE_LIST', recommendResourceList);
  },

  recommendSongsList(
    { commit }: ActionContext<{}, {}>,
    recommendSongsList: IRecommendSong[]
  ): void {
    commit('SET_RECOMMENDSONGS_LIST', recommendSongsList);
  }
};

const mutations = {
  SET_BANNERS: (state: IHomeState, banners: IBanner): void => {
    state.banners = banners;
  },
  UPDATE_CLASSNAME: (state: IHomeState, className: string[]): void => {
    state.className = className;
  },
  SET_RECOMMENDRESOURCE_LIST: (
    state: IHomeState,
    recommendResourceList: IRecommendResource[]
  ): void => {
    state.recommendResourceList = recommendResourceList;
  },
  SET_RECOMMENDSONGS_LIST: (
    state: IHomeState,
    recommendSongsList: IRecommendSong[]
  ): void => {
    state.recommendSongsList = recommendSongsList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
