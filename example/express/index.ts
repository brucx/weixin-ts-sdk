import * as express from "express";
import * as bodyParser from "body-parser";
import * as weixin from "../../lib";

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
      oa.templateMessage.send({
        touser: msg.FromUserName,
        template_id: "bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk",
        data: {
          first: { value: "模板消息" },
          keyword1: { value: msg.Content, color: "#656565" },
          remark: { value: "remark" }
        }
      });
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

app.use(bodyParser.text({ type: "*/xml" }));
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/wx", oa.server.echo());
app.post("/wx", oa.server.listen(routers));

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
  const userinfo = await oa.oauth.getUserInfo(access_token, openid);
  res.send(userinfo);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
