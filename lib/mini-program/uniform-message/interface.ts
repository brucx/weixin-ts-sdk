export interface ISendParams {
  touser: string; //是: 用户openid，可以是小程序的openid，也可以是mp_template_msg.appid对应的公众号的openid
  weapp_template_msg?: IWeappTemplateMsg; //否: 小程序模板消息相关的信息，可以参考小程序模板消息接口; 有此节点则优先发送小程序模板消息
  mp_template_msg: IMpTemplateMsg; //是: 公众号模板消息相关的信息，可以参考公众号模板消息接口；有此节点并且没有weapp_template_msg节点时，发送公众号模板消息
}

export interface IWeappTemplateMsg {
  template_id: string; //是: 小程序模板ID
  page: string; //是: 小程序页面路径
  form_id: string; //是: 小程序模板消息formid
  data: ITemplateData; //是: 小程序模板数据
  emphasis_keyword: string; //是: 小程序模板放大关键词
}

export interface IMpTemplateMsg {
  appid: string; //是: 公众号appid，要求与小程序有绑定且同主体
  template_id: string; //是: 公众号模板id
  url: string; //是: 公众号模板消息所要跳转的url
  miniprogram: IMiniprogram; //是: 公众号模板消息所要跳转的小程序，小程序的必须与公众号具有绑定关系
  data: ITemplateData; //是: 公众号模板消息的数据
}

export interface IMiniprogram {
  appid: string; // 小程序 appid
  pagepath: string; // 小程序跳转路径
}

export interface ITemplateData {
  first?: ITemplateDataItem;
  keyword1?: ITemplateDataItem;
  keyword2?: ITemplateDataItem;
  keyword3?: ITemplateDataItem;
  keyword4?: ITemplateDataItem;
  keyword5?: ITemplateDataItem;
  keyword6?: ITemplateDataItem;
  remark?: ITemplateDataItem;
}

interface ITemplateDataItem {
  value: string;
  color?: string;
}
