import { MiniProgram } from "..";
import { IErrorResponse } from "../../interface";
import {
  IAddOrderParams,
  IAddOrderResponse,
  IBatchGetOrderResponse,
  IGetAllAccountResponse,
  IGetAllDeliveryResponse,
  IGetOrderParams,
  IGetOrderResponse,
  IGetPathParams,
  IGetPathResponse,
  IGetPrinterResponse,
  IGetQuotaResponse,
  IOrder,
  IPathItemList
} from "./interface";

/**
 * 物流助手
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.addOrder.html
 */
export class Logistics {
  private mini: MiniProgram;
  constructor(mini: MiniProgram) {
    this.mini = mini;
  }

  /**
   * 生成运单
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.addOrder.html
   */
  async addOrder(body: IAddOrderParams) {
    const url = "cgi-bin/express/business/order/add";
    const resp: IAddOrderResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`生成运单失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 批量获取运单数据
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.batchGetOrder.html
   */
  async batchGetOrder(body: { order_list: Array<IOrder> }) {
    const url = "cgi-bin/express/business/order/add";
    const resp: IBatchGetOrderResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`批量获取运单数据失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 绑定、解绑物流账号
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.bindAccount.html
   */
  async bindAccount(body: {
    type: string; // bind表示绑定，unbind表示解除绑定
    biz_id: string; // 快递公司客户编码
    delivery_id: string; // 快递公司ID
    password: string; // 快递公司客户密码, ems，顺丰，京东非必填
    remark_content: string; // 备注内容（提交EMS审核需要）
  }) {
    const url = "cgi-bin/express/business/account/bind";
    const resp: IErrorResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`绑定、解绑物流账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 取消运单
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.cancelOrder.html
   */
  async cancelOrder(body: {
    order_id: string; // bind表示绑定，unbind表示解除绑定
    openid?: string; // 用户openid，当add_source=2时无需填写（不发送物流服务通知）
    delivery_id: string; // 快递公司ID
    waybill_id: string; // 运单ID
  }) {
    const url = "cgi-bin/express/business/order/cancel";
    const resp: IErrorResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`取消运单失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 获取所有绑定的物流账号
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getAllAccount.html
   */
  async getAllAccount() {
    const url = "cgi-bin/express/business/account/getall";
    const resp: IGetAllAccountResponse = await this.mini.http.get(url);
    if (resp.data.errcode) {
      throw new Error(
        `获取所有绑定的物流账号失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }

  /**
   * 获取支持的快递公司列表
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getAllAccount.html
   */
  async getAllDelivery() {
    const url = "cgi-bin/express/business/delivery/getall";
    const resp: IGetAllDeliveryResponse = await this.mini.http.get(url);
    if (resp.data.errcode) {
      throw new Error(
        `获取支持的快递公司列表失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }

  /**
   * 获取运单数据
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getOrder.html
   */
  async getOrder(body: IGetOrderParams) {
    const url = "cgi-bin/express/business/order/get";
    const resp: IGetOrderResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`获取运单数据失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 查询运单轨迹
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getPath.html
   */
  async getPath(body: IGetPathParams) {
    const url = "cgi-bin/express/business/path/get";
    const resp: IGetPathResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`查询运单轨迹失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 获取打印员
   * 若需要使用微信打单 PC 软件，才需要调用。
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getPrinter.html
   */
  async getPrinter() {
    const url = "cgi-bin/express/business/printer/getall";
    const resp: IGetPrinterResponse = await this.mini.http.get(url);
    if (resp.data.errcode) {
      throw new Error(`获取打印员失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 获取电子面单余额
   * 仅在使用加盟类快递公司时，才可以调用。
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getQuota.html
   */
  async getQuota(body: {
    delivery_id: string; // 快递公司ID，参见getAllDelivery
    biz_id: string; // 快递公司客户编码
  }) {
    const url = "cgi-bin/express/business/quota/get";
    const resp: IGetQuotaResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`获取电子面单余额失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }

  /**
   * 模拟快递公司更新订单状态
   * 该接口只能用户测试
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.testUpdateOrder.html
   */
  async testUpdateOrder(
    body: {
      delivery_id: string; // 快递公司ID，参见getAllDelivery
      biz_id: string; // 快递公司客户编码
      order_id: string;
      waybill_id: string;
    } & IPathItemList
  ) {
    const url = "cgi-bin/express/business/test_update_order";
    const resp: IErrorResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(
        `模拟快递公司更新订单状态失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }

  /**
   * 配置面单打印员
   * 可以设置多个，若需要使用微信打单 PC 软件，才需要调用
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.testUpdateOrder.html
   */
  async updatePrinter(body: {
    openid: string; // 打印员 openid
    update_type: "bind" | "unbind"; // 更新类型
    tagid_list?: string; // 用于平台型小程序设置入驻方的打印员面单打印权限，同一打印员最多支持10个tagid，使用半角逗号分隔，中间不加空格，如填写123,456，表示该打印员可以拉取到tagid为123和456的下的单，非平台型小程序无需填写该字段
  }) {
    const url = "cgi-bin/express/business/test_update_order";
    const resp: IErrorResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`配置面单打印员失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }
}
