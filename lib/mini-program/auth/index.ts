import { MiniProgram } from "..";
import { IArrayBufferResponse } from "./interface";
import { IError } from "../../interface";

/**
 * 小程序码
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html
 */
export class Auth {
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
   * 生成小程序码接口 C
   * 生成二维码，可接受 path 参数较长，生成个数受限
   */
  async get({
    path,
    width = 430,
    auto_color = false,
    line_color = { r: 0, g: 0, b: 0 },
    is_hyaline = false
  }) {
    const url = "cgi-bin/wxaapp/getwxacode";
    const body = {
      path,
      width,
      auto_color,
      line_color,
      is_hyaline
    };
    const resp: IArrayBufferResponse = await this.mini.http.post(url, body, {
      responseType: "arraybuffer"
    });
    if (resp.headers["content-type"].startsWith("application/json")) {
      const data = JSON.parse(resp.data.toString()) as IError;
      if (data.errcode) {
        throw new Error(`生成小程序码接口C调用失败: ${JSON.stringify(data)}`);
      }
    }
    return resp.data;
  }

  /**
   * 生成小程序码接口 B
   * 适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
   */
  async getUnlimited({
    scene,
    page = null,
    width = 430,
    auto_color = false,
    line_color = { r: 0, g: 0, b: 0 },
    is_hyaline = false
  }) {
    const url = "wxa/getwxacodeunlimit";
    const body = {
      scene,
      page,
      width,
      auto_color,
      line_color,
      is_hyaline
    };
    const resp: IArrayBufferResponse = await this.mini.http.post(url, body, {
      responseType: "arraybuffer"
    });
    if (resp.headers["content-type"].startsWith("application/json")) {
      const data = JSON.parse(resp.data.toString()) as IError;
      if (data.errcode) {
        throw new Error(`生成小程序码接口B调用失败: ${JSON.stringify(data)}`);
      }
    }
    return resp.data;
  }
}
