import { IPlaySong, IPlayState } from '../../../interface/play';
import { ActionContext } from 'vuex';
import { AxiosError, AxiosResponse } from 'axios';
import { checkMusic, getMusicUrl } from '../../../api/play';
import store from '../../index';

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
  currentPlaySong: {},
  isPlay: false,
  volume: 1,
  playState: 'sequence'
};

const getters = {
  getMusicUrl: (state: IPlayState) => async (id: number) => {
    const isCopyRight: boolean = await checkMusic(id)
      .then((res: AxiosResponse): boolean => {
        if (res.data.success === false) {
          console.warn(res.data.message);
          store.dispatch(
            'play/updateCurrentSongIndex',
            state.currentSongIndex >= state.playSongsList.length - 1
              ? 0
              : state.currentSongIndex + 1
          );
          return false;
        }
        return true;
      })
      .catch((error: AxiosError): boolean => {
        console.error(error);
        store.dispatch(
          'play/updateCurrentSongIndex',
          state.currentSongIndex >= state.playSongsList.length - 1
            ? 0
            : state.currentSongIndex + 1
        );
        return false;
      });
    if (!isCopyRight) return;
    getMusicUrl(id)
      .then((res: AxiosResponse) => {
        store.dispatch('play/setUrl', res.data.data[0].url);
        store.dispatch('play/toggleIsPlay', true);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }
};

const actions = {
  setPlaySongsList({ commit }: ActionContext<{}, {}>, setData: ISetData): void {
    const { playSongsList, currentSongIndex } = setData;
    commit('SET_PLAYSONGS_LIST', playSongsList);
    commit('UPDATE_CURRENT_INDEX', currentSongIndex);
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
    commit('UPDATE_CURRENT_INDEX', currentSongIndex + 1);
    commit('UPDATE_CURRENT_PLAYSONG', playSong);
  },

  updateCurrentSongIndex(
    { state, commit }: ActionContext<IPlayState, {}>,
    currentSongIndex: number
  ): void {
    commit('UPDATE_CURRENT_INDEX', currentSongIndex);
    commit('UPDATE_CURRENT_PLAYSONG', state.playSongsList[currentSongIndex]);
  },
  setUrl({ commit }: ActionContext<{}, {}>, url: string): void {
    commit('SET_URL', url);
  },
  toggleIsPlay({ commit }: ActionContext<{}, {}>, isPlay: boolean): void {
    commit('TOGGLE_ISPLAY', isPlay);
  },
  updateVolume({ commit }: ActionContext<{}, {}>, volume: number): void {
    commit('UPDATE_VOLUME', volume);
  },
  togglePlayState({ commit }: ActionContext<{}, {}>, playState: string): void {
    commit('TOGGLEPLAYSTATE', playState);
  }
};

const mutations = {
  SET_PLAYSONGS_LIST: (state: IPlayState, playSongsList: IPlaySong[]): void => {
    state.playSongsList = playSongsList;
  },
  UPDATE_CURRENT_INDEX: (state: IPlayState, currentSongIndex: number): void => {
    state.currentSongIndex = currentSongIndex;
  },
  UPDATE_CURRENT_PLAYSONG: (
    state: IPlayState,
    currentPlaySong: IPlaySong
  ): void => {
    state.currentPlaySong = currentPlaySong;
    getters.getMusicUrl(state)(currentPlaySong.id);
  },
  INSERT_PLAYSONG: (state: IPlayState, insertData: IInsertData): void => {
    const { playSong, currentSongIndex } = insertData;
    state.playSongsList.splice(currentSongIndex + 1, 0, playSong);
    state.playSongsList = state.playSongsList;
  },
  SET_URL: (state: IPlayState, url: string): void => {
    (state.currentPlaySong as IPlaySong).url = url;
  },
  TOGGLE_ISPLAY: (state: IPlayState, isPlay: boolean): void => {
    state.isPlay = isPlay;
  },
  UPDATE_VOLUME: (state: IPlayState, volume: number): void => {
    state.volume = volume;
  },
  TOGGLEPLAYSTATE: (state: IPlayState, playState: string): void => {
    state.playState = playState;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
