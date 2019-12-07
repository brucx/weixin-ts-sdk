import { OfficialAccount } from "../";
import { createHash } from "crypto";

const encrypt = (algorithm: string, content: string): string => {
  const hash = createHash(algorithm);
  hash.update(content);
  return hash.digest("hex");
};
const sha1 = (content: string) => encrypt("sha1", content);

/**
 * 返回 Connect 中间件
 */
export class MPServer {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 回显
   * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5
   */
  echo() {
    return (req, res) => {
      const { signature, timestamp, echostr, nonce } = req.query;
      const arr = [this.oa.config.token, timestamp, nonce];
      arr.sort();
      const sha = sha1(arr.join(""));
      const result = signature === sha ? echostr : "Invalid Signature";
      res.send(result);
    };
  }
}
