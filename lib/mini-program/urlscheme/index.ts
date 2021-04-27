import { MiniProgram } from "..";
import { IGenerateParams, IGenerateResponse } from "./interface";

/**
 * 获取小程序scheme码
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-scheme/urlscheme.generate.html
 */
export class Urlscheme {
  private mini: MiniProgram;
  constructor(mini: MiniProgram) {
    this.mini = mini;
  }

  /**
   * 获取小程序scheme码
   * - 单个小程序每日生成Scheme上限为50万个（包含短期有效Scheme与长期有效Scheme）
   * - 有效时间超过31天的Scheme或永久有效的Scheme为长期有效Scheme，单个小程序总共可生成长期有效Scheme上限为10万个，请谨慎调用
   * - 有效时间不超过31天的Scheme为短期有效Scheme，单个小程序生成短期有效Scheme不设上限
   * - scheme weixin://dl/business/?t= *TICKET*
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-scheme/urlscheme.generate.html
   */
  async generate(body: IGenerateParams) {
    const url = "/wxa/generatescheme";
    const resp: IGenerateResponse = await this.mini.http.post(url, body);
    console.log(resp);
    if (resp.data.errcode) {
      throw new Error(`获取小程序scheme码失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data;
  }
}
