export interface ILoginInfo {
  phone?: number,
  password: string,
  is_remember?: boolean
}

export interface ICurrentUserInfo {
  [propname: string]: any;
}

export interface IUserState {
  current_user_info: ICurrentUserInfo,
  token: string,
  cookie: string | undefined
}
