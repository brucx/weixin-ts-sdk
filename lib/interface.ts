import { AxiosResponse } from "axios";

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
