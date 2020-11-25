import { AxiosResponse } from "axios";
import { IError } from "../../interface";

export interface ISession {
  openid: string;
  session_key: string;
  unionid?: string;
}

export type ISessionResponse = AxiosResponse<ISession & IError>;
