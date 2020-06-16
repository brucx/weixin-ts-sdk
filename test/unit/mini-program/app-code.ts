import { expect } from "chai";
import { mini } from ".";

describe("MiniProgram.AppCode", function() {
  it("createQRCode", async function() {
    const result = await mini.appCode.createQRCode("page/index/index", 280);
    expect(result.byteLength).gt(3000);
  });

  it.skip("get", async function() {
    const result = await mini.appCode.get({
      path: "page/index/index",
      width: 280
    });
    expect(result.byteLength).gt(3000);
  });

  it("getUnlimited", async function() {
    const result = await mini.appCode.getUnlimited({
      scene: "test",
      width: 280
    });
    expect(result.byteLength).gt(3000);
  });
});
