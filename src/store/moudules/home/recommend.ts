import { IRecommendSong, IRecommendState } from '../../../interface/home';
import { ActionContext } from 'vuex';

const state: IRecommendState = {
  dayRecommendSongsList: []
};

const getters = {};

const actions = {
  setDayRecommendSongsList(
    { commit }: ActionContext<{}, {}>,
    dayRecommendSongsList: IRecommendSong[]
  ): void {
    commit('SET_DAYRECOMMENDSONGS_LIST', dayRecommendSongsList);
  }
};

const mutations = {
  SET_DAYRECOMMENDSONGS_LIST: (
    state: IRecommendState,
    dayRecommendSongsList: IRecommendSong[]
  ): void => {
    state.dayRecommendSongsList = dayRecommendSongsList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
