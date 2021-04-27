import { expect } from "chai";
import { mini } from ".";

describe("MiniProgram.Urlscheme", function() {
  it.skip("generate", async function() {
    const result = await mini.urlscheme.generate({
      jump_wxa: {
        path: null,
        query: "test"
      },
      is_expire: false,
      expire_time: Math.floor(+new Date() / 1000)
    });
    expect(result.openlink).contain("weixin://dl/business/");
  });
});
