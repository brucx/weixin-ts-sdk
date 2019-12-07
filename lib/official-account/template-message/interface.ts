import { AxiosResponse } from "axios";
import { IError } from "../interface";

interface IMPTemplate {
  template_id: string;
  title: string;
  primary_industry: string;
  deputy_industry: string;
  content: string;
  example: string;
}

export type IMPTemplateList = [IMPTemplate];

export type IMPTemplateListResponse = AxiosResponse<
  { template_list: IMPTemplateList } & {
    errcode: string;
    errmsg: string;
  }
>;

export interface ISendTemplateOpts {
  touser: string;
  template_id: string;
  url?: string;
  miniprogram?: IMiniProgram;
  data: ITemplateData;
}

export interface IMiniProgram {
  appid: string;
  pagepath?: string;
}

interface ITemplateDataItem {
  value: string;
  color?: string;
}
export interface ITemplateData {
  first?: ITemplateDataItem;
  keyword1?: ITemplateDataItem;
  keyword2?: ITemplateDataItem;
  keyword3?: ITemplateDataItem;
  keyword4?: ITemplateDataItem;
  keyword5?: ITemplateDataItem;
  keyword6?: ITemplateDataItem;
  remark?: ITemplateDataItem;
}

export type IErrorResponse = AxiosResponse<IError>;
