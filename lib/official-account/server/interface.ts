export interface IMPMessageResponseText {
  ToUserName: string;
  FromUserName: string;
  CreateTime: number;
  MsgType: string;
  Content: string;
}

interface IMPMessageBase {
  ToUserName: string;
  FromUserName: string;
  CreateTime: number;
  MsgType: string;
}

interface IMPNormalMessageBase extends IMPMessageBase {
  MsgId: number;
}

export interface IMPMessageText extends IMPNormalMessageBase {
  Content: string;
}

export interface IMPMessageImage extends IMPNormalMessageBase {
  PicUrl: string;
  MediaId: string;
}

export interface IMPMessageVoice extends IMPNormalMessageBase {
  Format: string;
  Recognition?: string;
  MediaId: string;
}

export interface IMPMessageImage extends IMPNormalMessageBase {
  PicUrl: string;
  MediaId: string;
}

export interface IMPMessageVideo extends IMPNormalMessageBase {
  ThumbMediaId: string;
  MediaId: string;
}

export interface IMPMessageLocation extends IMPNormalMessageBase {
  Location_X: number;
  Location_Y: number;
  Scale: number;
  Label: string;
}

export interface IMPMessageLink extends IMPNormalMessageBase {
  Title: string;
  Description: string;
  Url: string;
}

export interface IMPMessageEvent extends IMPMessageBase {
  Event: string;
  EventKey?: string;
  Ticket?: string;
  Latitude?: number;
  Longitude?: number;
  Precision?: number;
}

export type IMPMessage =
  | IMPMessageText
  | IMPMessageImage
  | IMPMessageVoice
  | IMPMessageVideo
  | IMPMessageLocation
  | IMPMessageLink
  | IMPMessageEvent;

export interface IRouter {
  msgType: string; // text image voice video shortvideo location link event
  textContentRegExp?: RegExp;
  event?: string; // subscribe SCAN LOCATION CLICK VIEW
  eventKey?: string;
  processor(msg: IMPMessage): string | Promise<string | null>;
}

export type IRouters = IRouter[];
