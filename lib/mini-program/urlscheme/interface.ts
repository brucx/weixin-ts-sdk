import { AxiosResponse } from "axios";
import { IError } from "../../interface";

export interface IGenerateParams {
  jump_wxa: {
    path: string; // 通过scheme码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带query。path为空时会跳转小程序主页。
    query: string; // 通过scheme码进入小程序时的query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
  }; // 跳转到的目标小程序信息。
  is_expire?: boolean; // 生成的scheme码类型，到期失效：true，永久有效：false。
  expire_time?: number; // 到期失效的scheme码的失效时间，为Unix时间戳。生成的到期失效scheme码在该时间前有效。最长有效期为1年。生成到期失效的scheme时必填。
}

export type IGenerateResponse = AxiosResponse<
  IError & {
    openlink: string; // 生成的小程序scheme码 weixin://dl/business/?t= *TICKET*
  }
>;
