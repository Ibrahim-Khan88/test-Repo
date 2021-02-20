import { Category } from './Category';
import { Investigation } from './Invesigation';
import { Patient } from './Patient';

export interface InvestigationRequest {
    'id': Number,
    "status": string,
    "reportText": string,
    "reportImageEncode": string,
    "imageFileName":string,
    "reportImage":string;
    "externalId": Number,
    "reportUrl": string,
    "downloadStatus": string,
    "investigation": Investigation,
    "patient":Patient
}