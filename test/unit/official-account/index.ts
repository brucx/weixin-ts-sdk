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
  let token: string;
  it("getAccessToken", async function() {
    token = await oa.getAccessToken();
    expect(token).to.be.a("string");
  });
  it("getAccessToken should use cache", async function() {
    const newToken = await oa.getAccessToken();
    expect(newToken).to.equal(token);
  });
});

describe("TemplateMessage", function() {
  it("getPrivateTemplates", async function() {
    const result = await oa.templateMessage.getPrivateTemplates();
    expect(result).to.be.a("array");
  });
  it("send", async function() {
    const result = await oa.templateMessage.send({
      touser: "oN8FMwLhrCJu4io8s9ZzFMSJ37lQ",
      template_id: "bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk",
      data: {
        first: { value: "test" },
        keyword1: { value: "ok", color: "#656565" },
        remark: { value: "remark" }
      }
    });
    expect(result).to.equal("ok");
  });
});

describe("CustomerService", function() {
  it.skip("create", async function() {
    const result = await oa.customerService.create("test@woody.club", "test");
    expect(result).to.equal("ok");
  });
  it.skip("list", async function() {
    const result = await oa.customerService.list();
    expect(result).to.be.a("array");
  });
  it.skip("online", async function() {
    const result = await oa.customerService.online();
    expect(result).to.be.a("array");
  });
  it.skip("update", async function() {
    const result = await oa.customerService.update("test@woody.club", "test2");
    expect(result).to.equal("ok");
  });
  it.skip("delete", async function() {
    const result = await oa.customerService.delete("test@woody.club", "test2");
    expect(result).to.equal("ok");
  });
  it("send", async function() {
    const result = await oa.customerService.send({
      touser: "oN8FMwLhrCJu4io8s9ZzFMSJ37lQ",
      msgtype: "text",
      text: {
        content: "test"
      }
    });
    expect(result).to.equal("ok");
  });
});

describe("User", function() {
  it("get", async function() {
    const result = await oa.user.get({
      openid: "oN8FMwLhrCJu4io8s9ZzFMSJ37lQ"
    });
    expect(result).to.have.property("subscribe");
    expect(result).to.have.property("openid");
  });
});
