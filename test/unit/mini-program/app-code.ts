import { expect } from "chai";
import { mini } from ".";

describe("MiniProgram.AppCode", function() {
  it("createQRCode", async function() {
    const result = await mini.appCode.createQRCode("page/index/index", 280);
    expect(result.byteLength).gt(3000);
  });
});
