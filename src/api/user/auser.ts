import { get, post } from '../request';
import { ILoginInfo } from '../../interface/user/ilogin';
import { AxiosPromise } from 'axios';

export const loginStatus = (): AxiosPromise => {
  return get('/login/status');
};

export const Login = (params: ILoginInfo): AxiosPromise => {
  return post('/login/cellphone', params);
};

export const Logout = (): AxiosPromise => {
  return post('/logout');
};
