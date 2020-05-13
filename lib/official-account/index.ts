import axios from "axios";
import {
  IOfficialAccountConfig,
  IAccessTokenResponse,
  IAccessToken
} from "./interface";
import { MPServer } from "./server";
import { TemplateMessage } from "./template-message";
import { CustomerService } from "./customer-service";
import { User } from "./user";
import { MPOAuth } from "./oauth";
import { Jssdk } from "./jssdk";
import { Base } from "../base";

export class OfficialAccount extends Base {
  server: MPServer = new MPServer(this);
  templateMessage: TemplateMessage = new TemplateMessage(this);
  customerService: CustomerService = new CustomerService(this);
  user: User = new User(this);
  oauth: MPOAuth = new MPOAuth(this);
  jssdk: Jssdk = new Jssdk(this);

  constructor(config: IOfficialAccountConfig) {
    super(config);
    this.http = axios.create({ baseURL: "https://api.weixin.qq.com" });
    this.http.interceptors.request.use(
      async config => {
        const token = await this.getAccessToken();
        if (token) {
          config.params = Object.assign(
            {
              access_token: token
            },
            config.params
          );
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  async getAccessToken(): Promise<string> {
    const key = `appid:${this.config.appId}:access-token`;
    let token = await this.storage.get(key);
    if (!token) {
      const AccessToken = await this.getAccessTokenFromServer();
      token = AccessToken.accessToken;
      this.storage.set(key, token, AccessToken.expiresIn - 60 * 30);
    }
    return token;
  }

  /**
   * ===============================================
   * 以下调用微信API
   * ===============================================
   */

  /**
   * 直接从微信服务器获取 Token
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
   */
  private async getAccessTokenFromServer(): Promise<IAccessToken> {
    const url = "https://api.weixin.qq.com/cgi-bin/token";
    const params = {
      appid: this.config.appId,
      secret: this.config.secret,
      grant_type: "client_credential"
    };
    const resp: IAccessTokenResponse = await axios.get(url, {
      params
    });
    if (resp.data.errcode) {
      throw new Error(
        `获取公众号AccessToken失败: ${JSON.stringify(resp.data)}`
      );
    }
    return {
      accessToken: resp.data.access_token,
      expiresIn: resp.data.expires_in
    };
  }
}
