import { Patient } from './Patient';

export interface Billing {
    "id": string,
    "paymentValue": Number,
    "paymentType": string,
    "patient":Patient
}