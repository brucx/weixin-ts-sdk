import { expect } from "chai";
import { OfficialAccount } from "../../../lib";

// 沙盒账号 http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
const config = {
  appId: "wxc124e540d1875020",
  secret: "dcd143ad7e000de32c0236a29fcc6429",
  token: "dodoro"
};

const oa = new OfficialAccount(config);

describe("OfficialAccount", function() {
  it("getAccessTokenFromServer", async function() {
    const token = await oa.getAccessToken();
    expect(token).to.be.a("string");
  });
});

describe("TemplateMessage", function() {
  it("getPrivateTemplates", async function() {
    const templates = await oa.templateMessage.getPrivateTemplates();
    expect(templates).to.be.a("array");
  });
});
