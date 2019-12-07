import axios from "axios";
import {
  IOfficialAccountConfig,
  IAccessTokenResponse,
  IAccessToken
} from "./interface";

export default class OfficialAccount {
  private config: IOfficialAccountConfig;
  /**
   * 默认内存存储
   */
  private storage = {
    cache: Object,
    set(k: string, v: string) {
      this.cache[k] = v;
    },
    get(k: string) {
      return this.cache[k];
    }
  };

  constructor(config: IOfficialAccountConfig) {
    this.config = config;
    if (config.storage) {
      this.storage.set = config.storage.set;
      this.storage.get = config.storage.get;
    }
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
    const getAccessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token";
    const params = {
      appid: this.config.appId,
      secret: this.config.secret,
      grant_type: "client_credential" // eslint-disable-line
    };
    const resp: IAccessTokenResponse = await axios.get(getAccessTokenUrl, {
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
