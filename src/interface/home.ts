export interface IBanner {
  [propname: string]: any;
}

export interface IRecommendResource {
  [propname: string]: any;
}

export interface IRecommendSong {
  [propname: string]: any;
}

export interface IArtists {
  [propname: string]: any;
}

export interface IHomeState {
  banners: IBanner;
  className: string[];
  recommendResourceList: IRecommendResource;
  recommendSongsList: IRecommendSong;
}

export interface IRecommendState {
  dayRecommendSongsList: IRecommendSong;
}
