import { DropDownInput } from "./DropDownInput";
import { ParamGroup } from "./ParamGroup";

export interface Parameter {
    "id": number,
    'name': string,
    'refValue': string,
    'resultType': string,
    'reportResult': string,
    "paramGroup": ParamGroup,
    'dropDownInput':DropDownInput[],
    'unit' : string,
    'createdDate': string,
    'lastModifiedDate': string
}