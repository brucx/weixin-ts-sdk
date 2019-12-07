import { AxiosResponse } from "axios";

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
