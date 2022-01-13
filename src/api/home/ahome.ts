import { get } from '../request';
import { AxiosPromise } from 'axios';

export const banner = (): AxiosPromise => {
  return get('/banner');
};
