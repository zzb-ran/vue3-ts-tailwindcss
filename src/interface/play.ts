export interface IPlaySong {
  id: number;
  name: string;
  artists: string;
  picUrl: string;
  duration: string;
  url?: string;
}

export interface ICurrentUserInfo {
  [propname: string]: any;
}

export interface IPlayState {
  playSongsList: IPlaySong[];
  currentSongIndex: number;
  currentPlaySong: IPlaySong | {};
  isPlay: boolean;
}
