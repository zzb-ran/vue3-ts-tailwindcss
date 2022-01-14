import { get } from '../request';
import { AxiosPromise } from 'axios';

export const dayRecommendResource = (): AxiosPromise => {
  return get('/recomment/resource');
};

export const dayRecommendSongs = (): AxiosPromise => {
  return get('/recomment/songs');
};
