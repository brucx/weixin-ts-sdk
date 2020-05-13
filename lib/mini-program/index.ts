import { Base } from "../base";

export class MiniProgram extends Base {
  constructor(config) {
    super(config);
  }

  async getAccessToken(): Promise<string> {
    return "token";
  }
}
