import { AxiosResponse } from "axios";
import { IError } from "../../interface";

export interface IAddOrderParams {
  add_source: number; // 订单来源，0为小程序订单，2为App或H5订单，填2则不发送物流服务通知
  wx_appid?: string; // App或H5的appid，add_source=2时必填，需和开通了物流助手的小程序绑定同一open帐号
  order_id: string; // 订单ID，须保证全局唯一，不超过512字节
  openid?: string; //	用户openid，当add_source=2时无需填写（不发送物流服务通知）
  delivery_id: string; // 快递公司ID，参见getAllDelivery
  biz_id: string; //	快递客户编码或者现付编码
  custom_remark?: string; // 快递备注信息，比如"易碎物品"，不超过1024字节
  tagid?: number; // 订单标签id，用于平台型小程序区分平台上的入驻方，tagid须与入驻方账号一一对应，非平台型小程序无需填写该字段
  sender: ISender; // 发件人信息
  receiver: IReceiver; // 收件人信息
  cargo: ICargo; // 包裹信息，将传递给快递公司
  shop: IShop; // 商品信息，会展示到物流服务通知和电子面单中
  insured: IInsured; // 保价信息
  service: IService; // 服务类型
  expect_time?: number; // Unix 时间戳, 单位秒，顺丰必须传。 预期的上门揽件时间，0表示已事先约定取件时间；否则请传预期揽件时间戳，需大于当前时间，收件员会在预期时间附近上门。例如expect_time为“1557989929”，表示希望收件员将在2019年05月16日14:58:49-15:58:49内上门取货。说明：若选择 了预期揽件时间，请不要自己打单，由上门揽件的时候打印。如果是下顺丰散单，则必传此字段，否则不会有收件员上门揽件。
}

export interface ISender {
  name: string;
  tel?: string;
  mobile?: string;
  company?: string;
  post_code?: string;
  country?: string;
  province: string;
  city: string;
  area: string;
  address: string;
}

export interface IReceiver {
  name: string;
  tel?: string;
  mobile?: string;
  company?: string;
  post_code?: string;
  country?: string;
  province: string;
  city: string;
  area: string;
  address: string;
}

export interface ICargo {
  count: number;
  weight: number;
  space_x: number;
  space_y: number;
  space_z: number;
  detail_list: ICargoDetail[];
}

export interface ICargoDetail {
  name: string;
  count: number;
}

export interface IShop {
  wxa_path: string; // 商家小程序的路径，建议为订单页面
  img_url: string; // 商品缩略图 url
  goods_name: string; // 商品名称, 不超过128字节
  goods_count: number; // 商品数量
}

export interface IInsured {
  use_insured: number; // 是否保价，0 表示不保价，1 表示保价
  insured_value: number; // 保价金额，单位是分，比如: 10000 表示 100 元
}

export interface IService {
  service_type: number; // 服务类型ID，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/express/expressinfo.html
  service_name: string; // 服务名称，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/express/expressinfo.html
}

export interface IExpressOrder {
  order_id: string;
  waybill_id: string;
  waybill_data: IWaybillData;
  delivery_resultcode: number;
  delivery_resultmsg: string;
}

export interface IWaybillData {
  key: string;
  value: string;
}

export type IOrder = {
  order_id: string; // 订单ID
  delivery_id: string; // 快递公司ID，参见getAllDelivery
  waybill_id: string; // 运单ID
  print_html?: string; // 运单 html 的 BASE64 结果
  waybill_data?: IWaybillData[]; // 运单信息
  order_status?: number; // 运单状态, 0正常，1取消
};

export interface IGetParams {
  order_id?: string; // 订单 ID，需保证全局唯一
  openid?: string; // 用户openid，当add_source=2时无需填写（不发送物流服务通知）
  delivery_id: string; // 快递公司ID，参见getAllDelivery, 必须和waybill_id对应
  waybill_id?: string; // 运单ID
}

export type IGetPathParams = IGetParams;

export type IGetOrderParams = IGetParams;

export interface IPathItemList {
  action_time: number; // 轨迹节点 Unix 时间戳
  action_type:
    | 100001 // 揽件阶段-揽件成功
    | 100002 // 揽件阶段-揽件失败
    | 100003 // 揽件阶段-分配业务员
    | 200001 // 运输阶段-更新运输轨迹
    | 300002 // 派送阶段-开始派送
    | 300003 // 派送阶段-签收成功
    | 300004 // 派送阶段-签收失败
    | 400001 // 异常阶段-订单取消
    | 400002; // 异常阶段-订单滞留
  action_msg: string; // 轨迹节点详情
}

export type IGetPrinterResponse = AxiosResponse<
  IError & {
    count: number;
    openid: Array<string>;
    tagid_list: Array<string>;
  }
>;

export type IGetAllDeliveryResponse = AxiosResponse<
  IError & {
    count: number;
    data: Array<{
      delivery_id: string;
      delivery_name: string;
      can_use_cash: number;
      can_get_quota: number;
      cash_biz_id: string;
      service_type: Array<IService>; // 该绑定帐号支持的服务类型
    }>;
  }
>;

export type IGetAllAccountResponse = AxiosResponse<
  IError & {
    count: number;
    list: Array<{
      biz_id: string;
      delivery_id: string;
      create_time: number; // 账号绑定时间
      update_time: number;
      status_code: number; // 绑定状态 0	绑定成功 1	审核中 2	绑定失败 3	已解绑
      alias: string; // 账号别名
      remark_wrong_msg: string; // 账号绑定失败的错误信息（EMS审核结果）
      remark_content: string; // 账号绑定时的备注内容（提交EMS审核需要）
      quota_num: number; // 电子面单余额
      quota_update_time: number; // 电子面单余额更新时间
      service_type: Array<IService>; // 该绑定帐号支持的服务类型
    }>;
  }
>;

export type IAddOrderResponse = AxiosResponse<IError & IExpressOrder>;

export type IBatchGetOrderResponse = AxiosResponse<
  IError & {
    order_list: Array<IError & IOrder>;
  }
>;

export type IGetOrderResponse = AxiosResponse<IError & IOrder>;

export type IGetPathResponse = AxiosResponse<
  IError & {
    openid: string; // 用户openid
    delivery_id: string; // 快递公司 ID
    waybill_id: string; // 运单 ID
    path_item_num: number; // 轨迹节点数量
    path_item_list: Array<IPathItemList>; // 	轨迹节点列表
  }
>;

export type IGetQuotaResponse = AxiosResponse<
  IError & {
    quota_num: number; // 轨迹节点数量
  }
>;
