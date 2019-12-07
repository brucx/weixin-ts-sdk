import { OfficialAccount } from "../";
import { createHash } from "crypto";
import { IRouters, IMPMessage, IMPMessageResponseText } from "./interface";
import * as xml2js from "xml2js";

const encrypt = (algorithm: string, content: string): string => {
  const hash = createHash(algorithm);
  hash.update(content);
  return hash.digest("hex");
};
const sha1 = (content: string) => encrypt("sha1", content);

const buildXml = (message: IMPMessageResponseText) => {
  const builder = new xml2js.Builder({ rootName: "xml" });
  return builder.buildObject(message);
};

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

  /**
   * 监听微信消息
   */
  listen(routers: IRouters) {
    return async (req, res) => {
      const body = req.body;
      const { xml } = await xml2js.parseStringPromise(body);
      const msg = Object.keys(xml).reduce((p, c) => {
        p[c] = xml[c][0];
        return p;
      }, {}) as IMPMessage;
      const content = routers
        .filter(router => {
          if (router.msgType !== msg.MsgType) return false;
          if (router.event && router.event !== msg.Event) return false;
          if (router.eventKey && router.eventKey !== msg.EventKey) return false;
          if (
            router.textContentRegExp &&
            !router.textContentRegExp.test(msg.Content)
          ) {
            return false;
          }
          return true;
        })
        .map(router => router.processer(msg))
        .filter(e => e && e !== "")
        .join("\n");
      const result = buildXml({
        CreateTime: Math.floor(+new Date() / 1000),
        ToUserName: msg.FromUserName,
        FromUserName: msg.ToUserName,
        MsgType: "text",
        Content: content
      });
      res.send(result);
    };
  }
}
