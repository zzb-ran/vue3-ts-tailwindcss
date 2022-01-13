import Cookies from 'js-cookie';
import { ICurrentUserInfo } from '../interface/user/ilogin';

const CookieKey = 'music-cookie';
const UserKey = 'current-user-info';

const ExpireDay = 365;

export const setCookie = (cookie: string) => {
  return Cookies.set(CookieKey, cookie, { expires: ExpireDay });
};

export const getCookie = () => {
  return Cookies.get(CookieKey);
};

export const removeCookie = () => {
  Cookies.remove(CookieKey);
};

export const setCurrentUserInfo = (currentUserInfo: ICurrentUserInfo) => {
  return Cookies.set(UserKey, JSON.stringify(currentUserInfo), {
    expires: ExpireDay
  });
};

export const getCurrentUserInfo = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? null : JSON.parse(user);
};

export const removeCurrentUserInfo = () => {
  Cookies.remove(UserKey);
};
