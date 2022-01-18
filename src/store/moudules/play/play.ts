import { IPlaySong, IPlayState } from '../../../interface/play';
import { ActionContext } from 'vuex';

interface ISetData {
  playSongsList: IPlaySong[];
  currentSongIndex: number;
}

interface IInsertData {
  playSong: IPlaySong;
  currentSongIndex: number;
}

const state: IPlayState = {
  playSongsList: [],
  currentSongIndex: 0,
  currentPlaySong: {}
};

const getters = {};

const actions = {
  playSongsList({ commit }: ActionContext<{}, {}>, setData: ISetData): void {
    const { playSongsList, currentSongIndex } = setData;
    commit('SET_PLAYSONGS_LIST', playSongsList);
    commit('UPDATR_CURRENT_INDEX', currentSongIndex);
    commit('UPDATE_CURRENT_PLAYSONG', playSongsList[currentSongIndex]);
  },

  insertPlaySong(
    { commit }: ActionContext<{}, {}>,
    insertData: IInsertData
  ): void {
    const { playSong, currentSongIndex } = insertData;
    const index = state.playSongsList.findIndex(
      (playSongItem) => playSongItem.id === playSong.id
    );
    if (index !== -1) {
      console.log('播放列表已存在该首歌曲...');
      return;
    }
    commit('INSERT_PLAYSONG', insertData);
    commit('UPDATR_CURRENT_INDEX', currentSongIndex + 1);
    commit('UPDATE_CURRENT_PLAYSONG', playSong);
  }
};

const mutations = {
  SET_PLAYSONGS_LIST: (state: IPlayState, playSongsList: IPlaySong[]): void => {
    state.playSongsList = playSongsList;
  },
  UPDATR_CURRENT_INDEX: (state: IPlayState, currentSongIndex: number): void => {
    state.currentSongIndex = currentSongIndex;
  },
  UPDATE_CURRENT_PLAYSONG: (
    state: IPlayState,
    currentPlaySong: IPlaySong
  ): void => {
    state.currentPlaySong = currentPlaySong;
  },
  INSERT_PLAYSONG: (state: IPlayState, insertData: IInsertData): void => {
    const { playSong, currentSongIndex } = insertData;
    state.playSongsList.splice(currentSongIndex + 1, 0, playSong);
    state.playSongsList = state.playSongsList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
