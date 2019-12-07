import { AxiosResponse } from "axios";

export interface IOfficialAccountConfig {
  appId: string;
  secret: string;
  token: string;
  aesKey?: string;
  storage?: {
    set(k: string, v: string, ttl: number): null & Promise<null>;
    get(k: string): string & Promise<string>;
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
  errcode: string;
  errmsg: string;
}

export type IAccessTokenResponse = AxiosResponse<IToken & IError>;
