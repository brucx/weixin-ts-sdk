import { AxiosResponse } from "axios";

export interface IConfig {
  appId: string;
  secret?: string;
  token?: string;
  aesKey?: string;
  storage?: {
    set(k: string, v: string, ttl: number): void | Promise<void>;
    get(k: string): string | Promise<string>;
  };
  preventTokenRefreshing?: boolean; // 阻止AccessToken刷新
  getAccessTokenFromServer?: Function;
}

export interface IAccessToken {
  accessToken: string;
  expiresIn: number;
}

interface IToken {
  access_token: string;
  expires_in: number;
}

export interface IError {
  errcode: number;
  errmsg: string;
}

export type IErrorResponse = AxiosResponse<IError>;
export type IAccessTokenResponse = AxiosResponse<IToken & IError>;
