import { Base } from "../base";
import { IConfig } from "../interface";
import { WXACode } from "./wxacode";
import { Auth } from "./auth";
import { Logistics } from "./logistics";
import { UniformMessage } from "./uniform-message";
import { Urlscheme } from "./urlscheme";

export class MiniProgram extends Base {
  wxacode: WXACode = new WXACode(this);
  auth: Auth = new Auth(this);
  logistics: Logistics = new Logistics(this);
  uniformMessage: UniformMessage = new UniformMessage(this);
  urlscheme: Urlscheme = new Urlscheme(this);

  constructor(config: IConfig) {
    super(config);
  }
}
