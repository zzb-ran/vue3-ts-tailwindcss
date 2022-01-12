import Cookies from 'js-cookie';
import { ICurrentUserInfo } from '../interface/user/login';

const CookieKey = 'music-cookie';
const UserKey = 'current-user-info';

export const getCookie = () => {
  return Cookies.get(CookieKey);
};

export const setCookie = (cookie: string) => {
  return Cookies.set(CookieKey, cookie);
};

export const removeCookie = () => {
  Cookies.remove(CookieKey);
};

export const setCurrentUserInfo = (currentUserInfo: ICurrentUserInfo) => {
  return Cookies.set(UserKey, JSON.stringify(currentUserInfo));
};

export const getCurrentUserInfo = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? null : JSON.parse(user);
};

export const removeCurrentUserInfo = () => {
  Cookies.remove(UserKey);
};