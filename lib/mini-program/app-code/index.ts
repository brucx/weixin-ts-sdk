import { MiniProgram } from "..";
import { IArrayBufferResponse } from "./interface";
import { IError } from "../../interface";

/**
 * 小程序码
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html
 */
export class AppCode {
  private mini: MiniProgram;
  constructor(mini: MiniProgram) {
    this.mini = mini;
  }

  /**
   * 生成小程序码接口 A
   * 可接受 path 参数较长，生成个数受限，请谨慎使用
   * 接口 A 加上接口 C，总共生成的码数量限制为 100,000，请谨慎调用。
   */
  async createQRCode(path: string, width = 430) {
    const url = "cgi-bin/wxaapp/createwxaqrcode";
    const body = {
      path,
      width
    };
    const resp: IArrayBufferResponse = await this.mini.http.post(url, body, {
      responseType: "arraybuffer"
    });
    if (resp.headers["content-type"].startsWith("application/json")) {
      const data = JSON.parse(resp.data.toString()) as IError;
      if (data.errcode) {
        throw new Error(`生成小程序码接口A调用失败: ${JSON.stringify(data)}`);
      }
    }
    return resp.data;
  }

  /**
   * 生成小程序码接口 A
   * 可接受 path 参数较长，生成个数受限，请谨慎使用
   * 接口 A 加上接口 C，总共生成的码数量限制为 100,000，请谨慎调用。
   */
  // async get() {
  // }
}
