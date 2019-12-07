import { expect } from "chai";
import { OfficialAccount } from "../../../lib";

describe("cluster", function() {
  it("should return true", function() {
    const oa = new OfficialAccount();
    expect(oa.test()).to.eq(true);
  });
});
