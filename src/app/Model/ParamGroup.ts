import { Parameter } from "./Parameter";


export interface ParamGroup {
    "id": Number,
    'name': string,
    'createdDate': string,
    'lastModifiedDate': string,
    'headingShow':boolean,
    'parameters': Parameter[]
}