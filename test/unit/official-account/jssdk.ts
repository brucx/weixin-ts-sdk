import { expect } from "chai";
import { oa } from ".";

describe("JSSDK", function() {
  let token: string;
  it("getJsapiTicket", async function() {
    token = await oa.jssdk.getJsapiTicket();
    expect(token).to.be.a("string");
  });
  it("getJsapiTicket should use cache", async function() {
    const newToken = await oa.jssdk.getJsapiTicket();
    expect(newToken).to.equal(token);
  });
});
