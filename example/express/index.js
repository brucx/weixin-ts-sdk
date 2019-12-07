const express = require("express");
const weixin = require("../../built");
const app = express();
const port = 3000;

const oa = new weixin.OfficialAccount({
  appId: "wxc124e540d1875020",
  secret: "dcd143ad7e000de32c0236a29fcc6429",
  token: "dodoro"
});

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/wx", oa.server.echo());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
