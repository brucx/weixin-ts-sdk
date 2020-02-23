import * as querystring from "querystring";
import { OfficialAccount } from "../";
import { IUserOpenId } from "./interface";
import { IUserInfo } from "../user/interface";

/**
 * 微信网页授权
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */
export class MPOAuth {
  private oa: OfficialAccount;

  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 跳转微信授权
   * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
   */
  redirect(redirect_uri: string, scope: "snsapi_base" | "snsapi_userinfo") {
    return (req, res) => {
      const { state = "STATE" } = req.query;
      const queryStr = querystring.stringify({
        appid: this.oa.config.appId,
        redirect_uri: "http://" + req.hostname + redirect_uri,
        response_type: "code",
        scope,
        state
      });
      const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?${queryStr}#wechat_redirect`;
      res.redirect(authUrl);
    };
  }

  /**
   * 通过 Code 换取 OpenId
   * @param code
   */
  async getUserAccessToken(code: string): Promise<IUserOpenId> {
    const url = "sns/oauth2/access_token";
    const params = {
      appid: this.oa.config.appId,
      secret: this.oa.config.secret,
      code,
      grant_type: "authorization_code"
    };
    const resp = await this.oa.http.get(url, { params });
    if (resp.data.errcode) {
      throw new Error(
        `通过 Code 换取 OpenId 失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }

  /**
   * 通过 access_token 换取 userinfo
   * @param access_token
   * @param openid
   * @param lang
   */
  async getUserInfo(
    access_token: string,
    openid: string,
    lang = "zh_CN"
  ): Promise<IUserInfo> {
    const url = "sns/userinfo";
    const params = {
      access_token,
      openid,
      lang
    };
    const resp = await this.oa.http.get(url, { params });
    if (resp.data.errcode) {
      throw new Error(
        `通过 access_token 换取 userinfo 失败: ${JSON.stringify(resp.data)}`
      );
    }
    return resp.data;
  }
}
