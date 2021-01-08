import { MiniProgram } from "..";
import { IErrorResponse } from "../../interface";
import { ISendParams } from "./interface";

/**
 * 统一服务消息
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/uniform-message/uniformMessage.send.html
 */
export class UniformMessage {
  private mini: MiniProgram;
  constructor(mini: MiniProgram) {
    this.mini = mini;
  }

  /**
   * 下发小程序和公众号统一的服务消息
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/uniform-message/uniformMessage.send.html
   */
  async send(body: ISendParams) {
    const url = "cgi-bin/express/business/order/add";
    const resp: IErrorResponse = await this.mini.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(
        `下发小程序和公众号统一的服务消息失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }
}
