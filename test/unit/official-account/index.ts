import { expect } from "chai";
import { OfficialAccount } from "../../../lib";

// 沙盒账号 http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
const config = {
  appId: "wxc124e540d1875020",
  secret: "dcd143ad7e000de32c0236a29fcc6429",
  token: "dodoro"
};
export const testOpenid = "oN8FMwLhrCJu4io8s9ZzFMSJ37lQ";
export const oa = new OfficialAccount(config);

describe("OfficialAccount.AccessToken", function() {
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
