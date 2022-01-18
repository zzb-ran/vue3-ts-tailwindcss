import { get } from './request';
import { AxiosPromise } from 'axios';

export const getSongDetail = (ids: number): AxiosPromise => {
  return get('/song/detail?ids=' + ids);
};

export const checkMusic = (id: number): AxiosPromise => {
  return get('/check/music?id=' + id);
};

export const getMusicUrl = (id: number): AxiosPromise => {
  return get('/recommend/songs?id=' + id);
};
