# weixin-ts-sdk

Node 版本的 EasyWeChat，原生 TypeScript（WIP）

示例代码：
./node_modules/.bin/ts-node example/express/index.ts

## 快速上手

```TypeScript
import * as express from "express";
import * as bodyParser from "body-parser";
import * as Redis from "ioredis";
import * as weixin from "weixin-ts-sdk";

const redis = new Redis();

// 新建公众号服务实例
// 如果不传入 storage，则使用实例内存缓存 Token
// 多实例部署时需使用外部缓存，此处以 Redis 为例
const oa = new weixin.OfficialAccount({
  appId: "wxc124e540*****",
  secret: "dcd143ad7e000*****",
  token: "abcdefg",
  storage: {
    async set(key, value, ttl) {
      redis.set(key, value, "EX", ttl);
    },
    async get(key) {
      return redis.get(key);
    }
  }
});

// 配置公众号收到消息后的路由条件
// 每条路由条件独立，一条消息可以触发多条路由
// processor的返回值将直接作为文本回复给用户
const listeners = [
  {
    msgType: "voice",
    processor(msg) {
      console.log(`${this.msgType}: ${JSON.stringify(msg)}`);
      return "收到语音：" + msg.MediaId;
    }
  },
  {
    msgType: "event",
    async processor(msg) {
      console.log(`${this.msgType}: ${JSON.stringify(msg)}`);
      return "收到事件：" + msg.Event;
    }
  },
  {
    msgType: "event",
    Event: "subscribe",
    async processor(msg) {
      // 获得用户详细信息
      const user = await oa.user.get({ openid: msg.FromUserName });
      console.log(user);
      return "收到订阅事件：" + msg.Event;
    }
  },
  {
    msgType: "text",
    processor(msg) {
      console.log(`${this.msgType}: ${JSON.stringify(msg)}`);
      return "收到文本：" + msg.Content;
    }
  },
  {
    msgType: "text",
    textContentRegExp: /^1/,
    processor(msg) {
      // 发送模板消息
      oa.templateMessage.send({
        touser: msg.FromUserName,
        template_id: "bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk",
        data: {
          first: { value: "模板消息" },
          keyword1: { value: msg.Content, color: "#656565" },
          remark: { value: "remark" }
        }
      });
      // 发送客服消息
      oa.customerService.send({
        touser: msg.FromUserName,
        msgtype: "text",
        text: {
          content: "这是客服消息"
        }
      });
      return "匹配上了正则(/^1/)";
    }
  }
];

const app = express();
const port = 3000;

app.use(bodyParser.text({ type: "*/xml" }));
app.get("/", (req, res) => res.send("Hello World!"));

// 公众号后台绑定的请求接口，监听微信服务器发送的消息事件
app.get("/wx/oa", oa.server.echo());
app.post("/wx/oa", oa.server.listen(listeners));

// 微信网页授权机制
app.get(
  "/wx/oauth/redirect",
  oa.oauth.redirect("/wx/oauth/callback", "snsapi_userinfo")
);
app.get("/wx/oauth/callback", async (req, res) => {
  const { code, state } = req.query;
  const {
    access_token,
    expires_in,
    refresh_token,
    openid
  } = await oa.oauth.getUserAccessToken(code);

  // 此处可通过 openid 和用户建立 session

  // 如果 scope 为 snsapi_userinfo，可通过此接口获得用户的详细信息
  const userinfo = await oa.oauth.getUserInfo(access_token, openid);

  res.send(userinfo);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## 项目路线图

项目的功能将逐步对齐 EasyWeChat，优先实现公众号、小程序、微信支付的接口。

以下是已实现模块。

公众号：

- [x] JSSDK
- [x] 客服
- [x] 网页 OAuth 授权
- [x] express 事件监听中间件
- [x] 模版消息
- [x] 用户和标签

小程序：

- [x] 小程序码

微信支付：
