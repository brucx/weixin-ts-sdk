import { OfficialAccount } from "../";
import {
  IMPTemplateListResponse,
  IMPTemplateList,
  ISendTemplateOpts,
  IErrorResponse
} from "./interface";

/**
 * 模板消息接口
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
 */
export class TemplateMessage {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 获取模板列表
   */
  async getPrivateTemplates(): Promise<IMPTemplateList> {
    const accessToken: string = await this.oa.getAccessToken();
    const url = "cgi-bin/template/get_all_private_template";
    const params = {
      access_token: accessToken
    };
    const resp: IMPTemplateListResponse = await this.oa.http.get(url, {
      params
    });
    if (resp.data.errcode) {
      throw new Error(`获取模板列表失败:${resp.data}`);
    }
    return resp.data.template_list;
  }

  /**
   * 发送模板消息
   */
  async send(opts: ISendTemplateOpts): Promise<string> {
    const accessToken: string = await this.oa.getAccessToken();
    const url = "cgi-bin/message/template/send";
    const params = {
      access_token: accessToken
    };
    const resp: IErrorResponse = await this.oa.http.post(url, opts, { params });
    if (resp.data.errcode) {
      throw new Error(`发送模板消息失败:${resp.data}`);
    }
    return resp.data.errmsg;
  }
}
