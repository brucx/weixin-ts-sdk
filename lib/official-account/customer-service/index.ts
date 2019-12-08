import { OfficialAccount } from "..";
import {
  IMPCustomerServiceListResponse,
  IMPCustomerServiceList,
  IMPCustomerServiceMessage
} from "./interface";
import { IErrorResponse } from "../template-message/interface";
import * as FormData from "form-data";

/**
 * 客服消息接口
 * https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html
 */
export class CustomerService {
  private oa: OfficialAccount;
  constructor(oa: OfficialAccount) {
    this.oa = oa;
  }

  /**
   * 获取所有客服账号
   */
  async list(): Promise<IMPCustomerServiceList> {
    const url = "cgi-bin/customservice/getkflist";
    const resp: IMPCustomerServiceListResponse = await this.oa.http.get(url);
    if (resp.data.errcode) {
      throw new Error(`获取所有客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.kf_list;
  }

  /**
   * 获取所有在线客服账号
   */
  async online(): Promise<IMPCustomerServiceList> {
    const url = "cgi-bin/customservice/getonlinekflist";
    const resp: IMPCustomerServiceListResponse = await this.oa.http.get(url);
    if (resp.data.errcode) {
      throw new Error(`获取所有在线客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.kf_list;
  }

  /**
   * 创建客服账号
   */
  async create(
    account: string,
    nickname: string,
    password?: string
  ): Promise<string> {
    const url = "customservice/kfaccount/add";
    const body = {
      kf_account: account,
      nickname,
      password
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`创建客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 更新客服账号
   */
  async update(
    account: string,
    nickname: string,
    password?: string
  ): Promise<string> {
    const url = "customservice/kfaccount/update";
    const body = {
      kf_account: account,
      nickname,
      password
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`更新客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 更新客服账号
   */
  async delete(
    account: string,
    nickname: string,
    password?: string
  ): Promise<string> {
    const url = "customservice/kfaccount/del";
    const body = {
      kf_account: account,
      nickname,
      password
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`更新客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 更新客服账号
   */
  async setAvatar(account: string, jpeg: Buffer): Promise<string> {
    const url = "customservice/kfaccount/uploadheadimg";
    const params = {
      kf_account: account
    };
    const form = new FormData();
    form.append("file", jpeg, "avatar.jpg");
    const resp: IErrorResponse = await this.oa.http.post(url, form, {
      params,
      headers: form.getHeaders()
    });
    if (resp.data.errcode) {
      throw new Error(`更新客服账号失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 发送客服消息
   */
  async send(msg: IMPCustomerServiceMessage) {
    const url = "cgi-bin/message/custom/send";
    const resp: IErrorResponse = await this.oa.http.post(url, msg);
    if (resp.data.errcode) {
      throw new Error(`发送客服消息失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 下发客服正在输入状态
   */
  async showTypingStatusToUser(openid: string) {
    const url = "cgi-bin/message/custom/send";
    const body = {
      touser: openid,
      command: "Typing"
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`下发客服正在输入状态失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 隐藏客服正在输入状态
   */
  async hideTypingStatusToUser(openid: string) {
    const url = "cgi-bin/message/custom/send";
    const body = {
      touser: openid,
      command: "CancelTyping"
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`下发客服正在输入状态失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }

  /**
   * 获取历史客服消息
   */
  async messages(
    startTime: number,
    endTime: number,
    msgId = 1,
    number = 10000
  ) {
    const url = "cgi-bin/message/custom/send";
    const body = {
      starttime: startTime,
      endtime: endTime,
      msgid: msgId,
      number
    };
    const resp: IErrorResponse = await this.oa.http.post(url, body);
    if (resp.data.errcode) {
      throw new Error(`获取历史客服消息失败: ${JSON.stringify(resp.data)}`);
    }
    return resp.data.errmsg;
  }
}
