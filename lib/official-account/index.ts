import axios from "axios";
import { IOfficialAccountConfig } from "./interface";
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
}
