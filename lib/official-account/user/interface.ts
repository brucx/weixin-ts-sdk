import { AxiosResponse } from "axios";
import { IError } from "../interface";

export type IErrorResponse = AxiosResponse<IError>;
export interface IUserInfo {
  subscribe: number;
  openid: string;
  nickname: string;
  sex: number;
  language: string;
  city: string;
  province: string;
  country: string;
  headimgurl: string;
  subscribe_time: number;
  unionid: string;
  remark: string;
  groupid: number;
  tagid_list: number[];
  subscribe_scene: string;
  qr_scene: number;
  qr_scene_str: string;
}

export interface IOpenIdPagination {
  total: number;
  count: number;
  data: {
    openid: string[];
  };
  next_openid: string;
}

export interface ITag {
  id: number;
  name: string;
  count: number;
}

export type ITags = ITag[];
