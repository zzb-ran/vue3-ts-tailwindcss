import { get } from '../request';
import { AxiosPromise } from 'axios';

export const banner = (): AxiosPromise => {
  return get('/banner');
};

export const recommendResource = (limit: number): AxiosPromise => {
  return get('/personalized?limit=' + limit);
};

export const recommendSongs = (limit: number): AxiosPromise => {
  return get('/personalized/newsong?limit=' + limit);
};
