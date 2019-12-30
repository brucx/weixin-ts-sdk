import { OfficialAccount } from "../";
import { IUserInfo, IOpenIdPagination } from "./interface";

/**
 * 用户管理
 */
export class User {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 获取用户列表
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
   */
  async list(next_openid?: string): Promise<IOpenIdPagination> {
    const url = "cgi-bin/user/get";
    const params = { next_openid };
    const resp = await this.oa.http.get(url, { params });
    if (resp.data.errcode) {
      throw new Error(`获取用户列表失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data as IOpenIdPagination;
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

  /**
   * 获取公众号的黑名单列表
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Manage_blacklist.html
   */
  async blacklist(begin_openid?: string) {
    const url = "cgi-bin/tags/members/getblacklist";
    const body = { begin_openid };
    const resp = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(
        `获取公众号的黑名单列表失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data as IOpenIdPagination;
  }

  /**
   * 拉黑用户
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Manage_blacklist.html
   */
  async block(openid_list?: string[]): Promise<string> {
    const url = "cgi-bin/tags/members/batchblacklist";
    const body = { openid_list };
    const resp = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`拉黑用户失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 取消拉黑用户
   * https://developers.weixin.qq.com/doc/offiaccount/User_Management/Manage_blacklist.html
   */
  async unblock(openid_list?: string[]): Promise<string> {
    const url = "cgi-bin/tags/members/batchunblacklist";
    const body = { openid_list };
    const resp = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`取消拉黑用户失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }
}
