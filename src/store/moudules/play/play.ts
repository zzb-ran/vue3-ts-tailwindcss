import { ILyc, ILyric, IPlaySong, IPlayState } from '../../../interface/play';
import { ActionContext } from 'vuex';
import { AxiosError, AxiosResponse } from 'axios';
import { checkMusic, getLyric, getMusicUrl } from '../../../api/play';
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
  playState: 'sequence',
  isSongDetail: false
};

const getters = {
  getMusicUrl: (state: IPlayState) => async (id: number) => {
    // 检查歌曲有无版权
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
    // 获取歌曲url
    getMusicUrl(id)
      .then((res: AxiosResponse) => {
        store.dispatch('play/setUrl', res.data.data[0].url);
        store.dispatch('play/toggleIsPlay', true);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
    // 获取歌词
    getLyric(id)
      .then((res: AxiosResponse) => {
        const lyric: Array<any> = res.data.lrc.lyric.split('\n'),
          newLyric: ILyc[] = [],
          lyricList: string[] = [];
        lyric.pop();
        lyric.forEach((lyc: string) => {
          lyricList.push(lyc.split(']')[1]);
          newLyric.push({
            time: lyc.split(']')[0].split('.')[0].split('[')[1],
            lyric: lyc.split(']')[1]
          });
        });
        store.dispatch('play/setLyric', {
          lyricList,
          newLyric
        });
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
  setLyric({ commit }: ActionContext<{}, {}>, lyric: string): void {
    commit('SET_LYRIC', lyric);
  },
  toggleIsPlay({ commit }: ActionContext<{}, {}>, isPlay: boolean): void {
    commit('TOGGLE_ISPLAY', isPlay);
  },
  updateVolume({ commit }: ActionContext<{}, {}>, volume: number): void {
    commit('UPDATE_VOLUME', volume);
  },
  togglePlayState({ commit }: ActionContext<{}, {}>, playState: string): void {
    commit('TOGGLEPLAYSTATE', playState);
  },
  toggleIsSongDetail(
    { commit }: ActionContext<{}, {}>,
    isSongDetail: boolean
  ): void {
    commit('TOGGLEISSONGDETAIL', isSongDetail);
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
  SET_LYRIC: (state: IPlayState, lyric: ILyric): void => {
    (state.currentPlaySong as IPlaySong).lyric = lyric;
  },
  TOGGLE_ISPLAY: (state: IPlayState, isPlay: boolean): void => {
    state.isPlay = isPlay;
  },
  UPDATE_VOLUME: (state: IPlayState, volume: number): void => {
    state.volume = volume;
  },
  TOGGLEPLAYSTATE: (state: IPlayState, playState: string): void => {
    state.playState = playState;
  },
  TOGGLEISSONGDETAIL: (state: IPlayState, isSongDetail: boolean): void => {
    state.isSongDetail = isSongDetail;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
