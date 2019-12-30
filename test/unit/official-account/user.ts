import { expect } from "chai";
import { oa, testOpenid } from ".";

describe("User", function() {
  it("list", async function() {
    const result = await oa.user.list();
    expect(result).to.have.property("total");
    expect(result).to.have.property("count");
  });
  it("get", async function() {
    const result = await oa.user.get({
      openid: testOpenid
    });
    expect(result).to.have.property("subscribe");
    expect(result).to.have.property("openid");
  });
  it("batchget", async function() {
    const result = await oa.user.batchget({
      openids: [testOpenid]
    });
    expect(result).to.be.a("array");
  });
  it("remark", async function() {
    const result = await oa.user.remark({
      openid: testOpenid,
      remark: "test"
    });
    expect(result).to.equal("ok");
  });
  it("block", async function() {
    const result = await oa.user.block([testOpenid]);
    expect(result).to.equal("ok");
  });
  it("blacklist", async function() {
    const result = await oa.user.blacklist();
    expect(result).to.have.property("total");
    expect(result).to.have.property("count");
  });
  it("unblock", async function() {
    const result = await oa.user.unblock([testOpenid]);
    expect(result).to.equal("ok");
  });

  let tagId;
  it("createTag", async function() {
    const result = await oa.user.createTag("createTag");
    expect(result).to.have.property("id");
    expect(result).to.have.property("name");
    tagId = result.id;
  });
  it("listTag", async function() {
    const result = await oa.user.listTag();
    expect(result).to.be.a("array");
  });
  it("updateTag", async function() {
    const result = await oa.user.updateTag(tagId, "updateTag");
    expect(result).to.equal("ok");
  });
  it("tagUsers", async function() {
    const result = await oa.user.tagUsers(tagId, [testOpenid]);
    expect(result).to.equal("ok");
  });
  it("usersOfTag", async function() {
    const result = await oa.user.usersOfTag(tagId);
    expect(result).to.have.property("count");
    expect(result).to.have.property("data");
  });
  it("deleteTag", async function() {
    const result = await oa.user.deleteTag(tagId);
    expect(result).to.equal("ok");
  });
});
