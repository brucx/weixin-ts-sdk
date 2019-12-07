import { OfficialAccount } from "../";
import { IMPTemplateListResponse, IMPTemplateList } from "./interface";

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
    const getPrivateTemplatesUrl = "cgi-bin/template/get_all_private_template";
    const params = {
      access_token: accessToken // eslint-disable-line
    };
    const resp: IMPTemplateListResponse = await this.oa.http.get(
      getPrivateTemplatesUrl,
      { params }
    );
    if (resp.data.errcode) {
      throw new Error(`获取模板列表失败`);
    }
    return resp.data.template_list;
  }
}
