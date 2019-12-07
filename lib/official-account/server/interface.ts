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

interface IMPMessageText extends IMPNormalMessageBase {
  Content: string;
}

interface IMPMessageImage extends IMPNormalMessageBase {
  PicUrl: string;
  MediaId: string;
}

interface IMPMessageVoice extends IMPNormalMessageBase {
  Format: string;
  Recognition?: string;
  MediaId: string;
}

interface IMPMessageImage extends IMPNormalMessageBase {
  PicUrl: string;
  MediaId: string;
}

interface IMPMessageVideo extends IMPNormalMessageBase {
  ThumbMediaId: string;
  MediaId: string;
}

interface IMPMessageLocation extends IMPNormalMessageBase {
  Location_X: number;
  Location_Y: number;
  Scale: number;
  Label: string;
}

interface IMPMessageLink extends IMPNormalMessageBase {
  Title: string;
  Description: string;
  Url: string;
}

interface IMPMessageEvent extends IMPMessageBase {
  Event: string;
  EventKey?: string;
  Ticket?: string;
  Latitude?: number;
  Longitude?: number;
  Precision?: number;
}

export type IMPMessage = IMPMessageText &
  IMPMessageImage &
  IMPMessageVoice &
  IMPMessageVideo &
  IMPMessageLocation &
  IMPMessageLink &
  IMPMessageEvent;

interface IRouter {
  msgType: string; // text image voice video shortvideo location link event
  textContentRegExp?: RegExp;
  event?: string; // subscribe SCAN LOCATION CLICK VIEW
  eventKey?: string;
  processer(msg: IMPMessage): string;
}

export type IRouters = [IRouter];
