import { ParamGroup } from "./ParamGroup";

export interface ReportResponseEntity {

    "investigationRequestId": number,
    "investigationName": string,
    "unit": string,
    "format": string,
    "refValue": string,
    "reportResult": string,
    "paramGroupList": ParamGroup[] 

}