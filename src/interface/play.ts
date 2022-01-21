export interface ILyc {
  time: string;
  lyric: string;
}

export interface ILyric {
  lyricList: string[];
  newLyric: ILyc[];
}

export interface IPlaySong {
  id: number;
  name: string;
  artists: string;
  picUrl: string;
  duration: string;
  url?: string;
  lyric?: ILyric;
}

export interface ICurrentUserInfo {
  [propname: string]: any;
}

export interface IPlayState {
  playSongsList: IPlaySong[];
  currentSongIndex: number;
  currentPlaySong: IPlaySong | {};
  isPlay: boolean;
  volume: number;
  playState: string;
  isSongDetail: boolean;
}
