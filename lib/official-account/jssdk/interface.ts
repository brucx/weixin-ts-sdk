export interface JsapiConfig {
  debug: boolean;
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
  jsApiList: string[];
}

type JsApi =
  | "updateAppMessageShareData"
  | "updateTimelineShareData"
  | "onMenuShareWeibo"
  | "onMenuShareQZone"
  | "startRecord"
  | "stopRecord"
  | "onVoiceRecordEnd"
  | "playVoice"
  | "pauseVoice"
  | "stopVoice"
  | "onVoicePlayEnd"
  | "uploadVoice"
  | "downloadVoice"
  | "chooseImage"
  | "previewImage"
  | "uploadImage"
  | "downloadImage"
  | "translateVoice"
  | "getNetworkType"
  | "openLocation"
  | "getLocation"
  | "hideOptionMenu"
  | "showOptionMenu"
  | "hideMenuItems"
  | "showMenuItems"
  | "hideAllNonBaseMenuItem"
  | "showAllNonBaseMenuItem"
  | "closeWindow"
  | "scanQRCode"
  | "chooseWXPay"
  | "openProductSpecificView"
  | "addCard"
  | "chooseCard"
  | "openCard";

export type JsApiList = JsApi[];
