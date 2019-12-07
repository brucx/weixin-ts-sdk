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
    msgType: "text",
    processer(msg) {
      console.log(msg);
      return "收到文本：" + msg.Content;
    }
  },
  {
    msgType: "text",
    textContentRegExp: /^1$/,
    processer(msg) {
      return "匹配上了正则";
    }
  }
];

app.use(bodyParser.text({ type: "*/xml" }));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/wx", oa.server.echo());
app.post("/wx", oa.server.listen(routers));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
