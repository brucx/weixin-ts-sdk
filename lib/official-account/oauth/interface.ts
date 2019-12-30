export interface IUserOpenId {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

export interface IUserInfo {
  openid: string;
  nickname: string;
  sex: string;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  privilege: string[];
  unionid: string;
}
