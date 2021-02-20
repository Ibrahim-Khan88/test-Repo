import { Accessories } from './Accessories';
import { Category } from './Category';
import { Department } from './Department';
import { Parameter } from './Parameter';
import { ParamGroup } from './ParamGroup';

export interface Investigation {
    'id' : Number,
    'name': string,
    'description': string,
    'note': string,
    'rate': number,
    'refValue' : string,
    'code' : string,
    'selectionCode' : string,
    'resultType' : string,
    'vatApply' : boolean,
    'vatApplyAmount' : number,
    'discountAmount' : number,
    'discountPer' : number,
    'sortingId' : number,
    'unit': string,
    'format' : string,
    "department": Department,
    "paramGroup": ParamGroup[],
    "parameters": Parameter[],
    "accessories": Accessories[]
}