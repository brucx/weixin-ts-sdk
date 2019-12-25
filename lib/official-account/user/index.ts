import { OfficialAccount } from "../";
import { IUserInfo } from "./interface";

/**
 * 用户管理
 */
export class User {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 通过 Open ID 获取用户基本信息(UnionID机制)
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
   */
  async get({ openid, lang = "zh_CN" }): Promise<IUserInfo> {
    const url = "cgi-bin/user/info";
    const params = {
      openid,
      lang
    };
    const resp = await this.oa.http.get(url, { params });
    if (resp.data.errcode) {
      throw new Error(`获取模板列表失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data as IUserInfo;
  }
}
