import { expect } from "chai";
import { OfficialAccount } from "../../../lib";

// 沙盒账号 http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
const config = {
  appId: "wxc124e540d1875020",
  secret: "dcd143ad7e000de32c0236a29fcc6429",
  token: "dodoro"
};

describe("OfficialAccount", function() {
  it("getAccessTokenFromServer", async function() {
    const oa = new OfficialAccount(config);
    const token = await oa.getAccessTokenFromServer();
    expect(token).to.have.property("accessToken");
    expect(token).to.have.property("expiresIn");
  });
});
