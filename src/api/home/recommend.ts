import { get } from '../request';
import { AxiosPromise } from 'axios';

export const dayRecommendResource = (): AxiosPromise => {
  return get('/recommend/resource');
};

export const dayRecommendSongs = (): AxiosPromise => {
  return get('/recommend/songs');
};
