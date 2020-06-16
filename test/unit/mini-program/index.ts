import { expect } from "chai";
import { MiniProgram } from "../../../lib";

// 沙盒账号 https://developers.weixin.qq.com/sandbox?tab=miniprogram&hl=zh
const config = {
  appId: "wx018baf0f824c2497",
  secret: "4c411d209c570f8fd809498a30676af0"
};
export const mini = new MiniProgram(config);

describe("MiniProgram.AccessToken", function() {
  let token: string;
  it("getAccessToken", async function() {
    token = await mini.getAccessToken();
    expect(token).to.be.a("string");
  });
  it("getAccessToken should use cache", async function() {
    const newToken = await mini.getAccessToken();
    expect(newToken).to.equal(token);
  });
});
