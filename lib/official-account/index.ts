import { IConfig } from "../interface";
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

  constructor(config: IConfig) {
    super(config);
  }
}
