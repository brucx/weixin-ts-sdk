import { expect } from "chai";
import { mini } from ".";

describe("MiniProgram.Logistics", function() {
  // 这个模块测试号没有调用权限，会报错：{"errcode":48001,"errmsg":"api unauthorized rid: 5ff7c7ba-41d825a2-07fcb80d"}
  it.skip("addOrder", async function() {
    const result = await mini.logistics.addOrder({
      add_source: 0,
      order_id: "1234",
      delivery_id: "5678",
      biz_id: "890",
      receiver: {
        address: "test",
        name: "eee",
        province: "北京",
        city: "北京",
        area: "朝阳",
        mobile: "17600001111"
      },
      sender: {
        address: "test",
        name: "eee",
        province: "北京",
        city: "北京",
        area: "朝阳",
        mobile: "17600001111"
      },
      cargo: {
        count: 1,
        space_x: 100,
        space_y: 100,
        space_z: 100,
        weight: 1000,
        detail_list: [
          {
            name: "图书",
            count: 1
          }
        ]
      },
      shop: {
        wxa_path: "/pages/index/index",
        img_url: "https://img",
        goods_count: 1,
        goods_name: "图书"
      },
      insured: {
        use_insured: 0,
        insured_value: 1000
      },
      service: {
        service_name: "test",
        service_type: 1
      }
    });
    expect(result).to.be.a("object");
  });

  it.skip("getAllDelivery", async function() {
    const result = await mini.logistics.getAllDelivery();
    expect(result).to.be.a("object");
  });
});
