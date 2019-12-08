# weixin-ts-sdk

Node 版本的 EasyWeChat，原生 TypeScript（WIP）

## 快速上手

```JavaScript
const express = require("express");
const bodyParser = require("body-parser");
const weixin = require("weixin-ts-sdk");

const app = express();
const port = 3000;

// 需要 bodyParser 读取 xml
app.use(bodyParser.text({ type: "*/xml" }));
app.get("/", (req, res) => res.send("Hello World!"));

// 新建公众号服务实例
const oa = new weixin.OfficialAccount({
  appId: "wxc124e540*****",
  secret: "dcd143ad7e000*****",
  token: "abcdefg"
});

// 配置公众号收到消息后的路由条件
// 每条路由条件独立，一条消息可以触发多条路由
// processor的返回值将直接作为文本回复给用户
const routers = [
  {
    msgType: "voice",
    processor(msg) {
      console.log(msg);
      return "收到语音：" + msg.MediaId;
    }
  },
  {
    msgType: "event",
    processor(msg) {
      console.log(msg);
      return "收到事件：" + msg.Event;
    }
  },
  {
    msgType: "text",
    processor(msg) {
      console.log(msg);
      return "收到文本：" + msg.Content;
    }
  },
  {
    msgType: "text",
    textContentRegExp: /^1/,
    processor(msg) {
      oa.templateMessage.send({
        touser: msg.FromUserName,
        template_id: "bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk",
        data: {
          first: { value: "test" },
          keyword1: { value: msg.Content, color: "#656565" },
          remark: { value: "remark" }
        }
      });
      return "匹配上了正则(/^1/)";
    }
  }
];

// 生成中间件并绑定到对应的端点
app.get("/wx/oa", oa.server.echo());
app.post("/wx/oa", oa.server.listen(routers));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## 项目路线图

项目的功能将逐步对齐 EasyWeChat，优先实现公众号、小程序、微信支付的接口。
