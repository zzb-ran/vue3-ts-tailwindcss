export interface IBanner {
  [propname: string]: any;
}

export interface IHomeState {
  banners: IBanner;
  className: string[];
}
