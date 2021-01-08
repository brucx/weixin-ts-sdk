import { Base } from "../base";
import { IConfig } from "../interface";
import { WXACode } from "./wxacode";
import { Auth } from "./auth";
import { Logistics } from "./logistics";

export class MiniProgram extends Base {
  wxacode: WXACode = new WXACode(this);
  auth: Auth = new Auth(this);
  logistics: Logistics = new Logistics(this);

  constructor(config: IConfig) {
    super(config);
  }
}
