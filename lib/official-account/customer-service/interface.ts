import { AxiosResponse } from "axios";
import { IError } from "../interface";

export interface IMPCustomerService {
  kf_account: string;
  kf_nick: string;
  kf_id?: string;
  kf_headimgurl?: string;
}

export type IMPCustomerServiceList = [IMPCustomerService];

export type IMPCustomerServiceListResponse = AxiosResponse<
  { kf_list: IMPCustomerServiceList } & IError
>;

interface IMPCustomerServiceMessageBase {
  touser: string;
  msgtype: string;
  customservice?: {
    kf_account: string;
  };
}

export interface IMPCustomerServiceMessageText
  extends IMPCustomerServiceMessageBase {
  text: {
    content: string;
  };
}

export interface IMPCustomerServiceMessageImage
  extends IMPCustomerServiceMessageBase {
  image: {
    media_id: string;
  };
}

export interface IMPCustomerServiceMessageVoice
  extends IMPCustomerServiceMessageBase {
  voice: {
    media_id: string;
  };
}

export interface IMPCustomerServiceMessageVideo
  extends IMPCustomerServiceMessageBase {
  video: {
    media_id: string;
    thumb_media_id: string;
    title: string;
    description: string;
  };
}

export interface IMPCustomerServiceMessageMusic
  extends IMPCustomerServiceMessageBase {
  music: {
    media_id: string;
    description: string;
    musicurl: string;
    hqmusicurl: string;
    thumb_media_id: string;
  };
}

export interface IMPCustomerServiceMessageNews
  extends IMPCustomerServiceMessageBase {
  news: {
    articles: [
      {
        title: string;
        description: string;
        url: string;
        picurl: string;
      }
    ];
  };
}

export interface IMPCustomerServiceMessageMpnews
  extends IMPCustomerServiceMessageBase {
  mpnews: {
    media_id: string;
  };
}

export interface IMPCustomerServiceMessageMsgmenu
  extends IMPCustomerServiceMessageBase {
  msgmenu: {
    head_content: string;
    list: [
      {
        id: string;
        content: string;
      }
    ];
    tail_content: string;
  };
}

export interface IMPCustomerServiceMessageWxcard
  extends IMPCustomerServiceMessageBase {
  wxcard: {
    card_id: string;
  };
}

export interface IMPCustomerServiceMessageMiniprogrampage
  extends IMPCustomerServiceMessageBase {
  miniprogrampage: {
    title: string;
    appid: string;
    pagepath: string;
    thumb_media_id: string;
  };
}

export type IMPCustomerServiceMessage =
  | IMPCustomerServiceMessageImage
  | IMPCustomerServiceMessageMiniprogrampage
  | IMPCustomerServiceMessageMpnews
  | IMPCustomerServiceMessageMsgmenu
  | IMPCustomerServiceMessageMusic
  | IMPCustomerServiceMessageText
  | IMPCustomerServiceMessageVideo
  | IMPCustomerServiceMessageVoice
  | IMPCustomerServiceMessageWxcard;
