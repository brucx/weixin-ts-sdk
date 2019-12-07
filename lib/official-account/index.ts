import axios from "axios";
import {
  IOfficialAccountConfig,
  IAccessTokenResponse,
  IAccessToken
} from "./interface";
import { TemplateMessage } from "./template-message";

export class OfficialAccount {
  private config: IOfficialAccountConfig;

  /**
   * 默认内存存储
   * ttl 秒后过期
   */
  private storage = {
    cache: Object,
    set(k: string, v: string, ttl?: number) {
      this.cache[k] = { value: v, expiresAt: +new Date() + 1000 * ttl };
    },
    get(k: string): string {
      return this.cache[k] && this.cache[k].expiresAt > +new Date()
        ? this.cache[k].value
        : null;
    }
  };

  http = axios.create({ baseURL: "https://api.weixin.qq.com" });

  templateMessage: TemplateMessage = new TemplateMessage(this);

  constructor(config: IOfficialAccountConfig) {
    this.config = config;
    if (config.storage) {
      this.storage.set = config.storage.set;
      this.storage.get = config.storage.get;
    }
  }

  async getAccessToken(): Promise<string> {
    const key = `appid:${this.config.appId}:access-token`;
    let token = this.storage.get(key);
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
  async getAccessTokenFromServer(): Promise<IAccessToken> {
    const getAccessTokenUrl = "/cgi-bin/token";
    const params = {
      appid: this.config.appId,
      secret: this.config.secret,
      grant_type: "client_credential" // eslint-disable-line
    };
    const resp: IAccessTokenResponse = await this.http.get(getAccessTokenUrl, {
      params
    });
    if (resp.data.errcode) {
      throw new Error(`获取公众号AccessToken失败`);
    }
    return {
      accessToken: resp.data.access_token,
      expiresIn: resp.data.expires_in
    };
  }
}
