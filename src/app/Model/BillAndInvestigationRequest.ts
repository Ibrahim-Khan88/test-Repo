import { Billing } from './Billing';
import { InvestigationRequest } from './investigationRequest';

export interface BillAndInvestigationRequest {

    "bill" : Billing,
    "investigationRequest" : InvestigationRequest;

}