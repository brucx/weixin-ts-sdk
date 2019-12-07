import { AxiosResponse } from "axios";

export interface IOfficialAccountConfig {
  appId: string;
  secret: string;
  token: string;
  aesKey?: string;
  storage?: {
    set(k: string, v: string): null;
    get(k: string): string;
  };
}

export interface IAccessToken {
  accessToken: string;
  expiresIn: number;
}

type Token = {
  access_token: string;
  expires_in: number;
};

export type IAccessTokenResponse = AxiosResponse<
  Token & {
    errcode: string;
    errmsg: string;
  }
>;
