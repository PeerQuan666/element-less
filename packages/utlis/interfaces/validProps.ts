import {ValidType} from '../enums'
export interface ValidProps{
    required?:boolean,
    requiredMessage?:string,
    validType?:ValidType,
    validExpression?:string,
    validMessage?:string,
    validMethod?:Function,
    validTrigger?:string,

}