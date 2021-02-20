import { AllInvestigationRequestEntity } from "./AllInvestigationRequestEntity";

export interface AllInvestigationRequestEntityContainer {

    "name": number,
    "billNumber": string,
    "mobile": string,
    "requestList": AllInvestigationRequestEntity[]

}