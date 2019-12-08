import { AxiosResponse } from "axios";

export interface IOfficialAccountConfig {
  appId: string;
  secret: string;
  token: string;
  aesKey?: string;
  storage?: {
    set(token: string, ttl: number): null | Promise<null>;
    get(): string | Promise<string>;
  };
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

export type IAccessTokenResponse = AxiosResponse<IToken & IError>;
