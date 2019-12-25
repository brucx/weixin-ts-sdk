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
      throw new Error(`获取用户基本信息失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data as IUserInfo;
  }

  /**
   * 批量获取用户基本信息
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
   */
  async batchget({
    openids,
    lang = "zh_CN"
  }: {
    openids: string[];
    lang?: string;
  }): Promise<IUserInfo[]> {
    const url = "cgi-bin/user/info/batchget";
    const body = {
      user_list: openids.map(e => ({ openid: e, lang }))
    };
    const resp = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`批量获取用户基本信息失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.user_info_list as IUserInfo[];
  }

  /**
   * 设置用户备注名
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Configuring_user_notes.html
   */
  async remark({
    openid,
    remark
  }: {
    openid: string;
    remark: string;
  }): Promise<string> {
    const url = "cgi-bin/user/info/updateremark";
    const body = { openid, remark };
    const resp = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`设置用户备注名失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }
}
