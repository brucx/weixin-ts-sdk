import { expect } from "chai";
import { oa, testOpenid } from "./";

describe("TemplateMessage", function() {
  it("getPrivateTemplates", async function() {
    const result = await oa.templateMessage.getPrivateTemplates();
    expect(result).to.be.a("array");
  });
  it("send", async function() {
    const result = await oa.templateMessage.send({
      touser: testOpenid,
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
