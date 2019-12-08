const express = require("express");
const bodyParser = require("body-parser");
const weixin = require("../../built");

const oa = new weixin.OfficialAccount({
  appId: "wxc124e540d1875020",
  secret: "dcd143ad7e000de32c0236a29fcc6429",
  token: "dodoro"
});

const app = express();
const port = 3000;

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

app.use(bodyParser.text({ type: "*/xml" }));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/wx", oa.server.echo());
app.post("/wx", oa.server.listen(routers));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
