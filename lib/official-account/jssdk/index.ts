import { OfficialAccount } from "../";
import { JsapiConfig, JsApiList } from "./interface";
import * as crypto from "crypto";

/**
 * JSSDK 管理
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
 */
export class Jssdk {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * JSSDK Config
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
   * @param url
   */
  async getJsapiConfig(
    url: string,
    jsApiList: JsApiList,
    debug = false
  ): Promise<JsapiConfig> {
    const nonceStr = Math.random()
      .toString(36)
      .substring(2, 15);
    const timestamp = Math.floor(+new Date() / 1000);
    const jsapiTicket = await this.getJsapiTicket();
    const params = [
      ["noncestr", nonceStr],
      ["timestamp", timestamp],
      ["jsapi_ticket", jsapiTicket],
      ["url", url]
    ];
    const signature = crypto
      .createHash("sha1")
      .update(
        params
          .map(e => e.join("="))
          .sort()
          .join("&"),
        "utf8"
      )
      .digest("hex");
    return {
      appId: this.oa.config.appId,
      jsApiList,
      debug,
      nonceStr,
      timestamp,
      signature
    };
  }

  async getJsapiTicket(): Promise<string> {
    const key = `appid:${this.oa.config.appId}:jssdk`;
    let ticket = await this.oa.storage.get(key);
    if (!ticket) {
      const jsapiTicket = await this.getJsapiTicketFromServer();
      ticket = jsapiTicket.ticket;
      this.oa.storage.set(key, ticket, jsapiTicket.expires_in - 60 * 30);
    }
    return ticket;
  }

  /**
   * 获取 jsapi_ticket
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
   */
  async getJsapiTicketFromServer(): Promise<{
    ticket: string;
    expires_in: number;
  }> {
    const url = `cgi-bin/ticket/getticket`;
    const params = { type: "jsapi" };
    const resp = await this.oa.http.get(url, { params });
    if (resp.data.errcode) {
      throw new Error(`获取 jsapi_ticket 失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }
}
