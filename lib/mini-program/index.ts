import { Base } from "../base";
import { IConfig } from "../interface";
import { AppCode } from "./app-code";
import { Auth } from "./auth";
import { Logistics } from "./logistics";

export class MiniProgram extends Base {
  appCode: AppCode = new AppCode(this);
  auth: Auth = new Auth(this);
  logistics: Logistics = new Logistics(this);

  constructor(config: IConfig) {
    super(config);
  }
}
