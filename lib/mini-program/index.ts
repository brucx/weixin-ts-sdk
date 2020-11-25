import { Base } from "../base";
import { IConfig } from "../interface";
import { AppCode } from "./app-code";
import { Auth } from "./auth";

export class MiniProgram extends Base {
  appCode: AppCode = new AppCode(this);
  auth: Auth = new Auth(this);

  constructor(config: IConfig) {
    super(config);
  }
}
