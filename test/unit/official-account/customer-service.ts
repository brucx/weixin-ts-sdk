import { expect } from "chai";
import { oa, testOpenid } from ".";

describe("OfficialAccount.CustomerService", function() {
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
      touser: testOpenid,
      msgtype: "text",
      text: {
        content: "test"
      }
    });
    expect(result).to.equal("ok");
  });
});
