export interface IPlaySong {
  id: string;
  name: string;
  artists: string;
  picUrl: string;
  duration: string;
}

export interface ICurrentUserInfo {
  [propname: string]: any;
}

export interface IPlayState {
  playSongsList: IPlaySong[];
  currentSongIndex: number;
  currentPlaySong: IPlaySong | {};
}
