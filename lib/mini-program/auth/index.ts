import { MiniProgram } from "..";
import { ISessionResponse } from "./interface";

/**
 * 登陆授权
 */
export class Auth {
  private mini: MiniProgram;
  constructor(mini: MiniProgram) {
    this.mini = mini;
  }

  /**
   * 登录凭证校验
   * 通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。更多使用方法详见 小程序登录。
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  async code2Session(code: string) {
    const url = "/sns/jscode2session";
    const params = {
      appid: this.mini.config.appId,
      secret: this.mini.config.secret,
      js_code: code,
      grant_type: "authorization_code"
    };
    const resp: ISessionResponse = await this.mini.http.get(url, { params });
    return resp.data;
  }
}
