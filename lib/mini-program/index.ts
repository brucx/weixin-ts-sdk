import { Base } from "../base";
import { IConfig } from "../interface";
import { AppCode } from "./app-code";

export class MiniProgram extends Base {
  appCode: AppCode = new AppCode(this);

  constructor(config: IConfig) {
    super(config);
  }
}
