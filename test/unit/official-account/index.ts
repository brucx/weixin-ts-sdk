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
    const reslut = await oa.templateMessage.getPrivateTemplates();
    expect(reslut).to.be.a("array");
  });
  it("send", async function() {
    const reslut = await oa.templateMessage.send({
      touser: "oN8FMwLhrCJu4io8s9ZzFMSJ37lQ",
      template_id: "bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk",
      data: {
        first: { value: "test" },
        keyword1: { value: "ok", color: "#656565" },
        remark: { value: "remark" }
      }
    });
    expect(reslut).to.equal("ok");
  });
});
