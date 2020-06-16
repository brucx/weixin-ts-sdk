import axios from "axios";
import { AxiosInstance } from "axios";
import { IAccessTokenResponse, IAccessToken } from "./interface";

export class Base {
  config: Record<string, any>;
  http: AxiosInstance;

  /**
   * 默认内存存储
   * ttl 秒后过期
   */
  storage = {
    cache: Object,
    set(k: string, v: string, ttl: number) {
      this.cache[k] = { value: v, expiresAt: +new Date() + 1000 * ttl };
    },
    get(k: string): string | Promise<string> {
      return this.cache[k] && this.cache[k].expiresAt > +new Date()
        ? this.cache[k].value
        : null;
    }
  };

  constructor(config: Record<string, any>) {
    this.config = config;
    if (config.storage) {
      this.storage.set = config.storage.set;
      this.storage.get = config.storage.get;
    }
    this.http = axios.create({ baseURL: "https://api.weixin.qq.com/" });
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
   * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
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
        `获取APP（${this.config.appId}）的AccessToken失败: ${JSON.stringify(
          resp.data
        )}`
      );
    }
    return {
      accessToken: resp.data.access_token,
      expiresIn: resp.data.expires_in
    };
  }
}
