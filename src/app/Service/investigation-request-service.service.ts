import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestigationRequest } from '../Model/investigationRequest';
import { FormGroup } from '@angular/forms';
import { BillAndInvestigationRequest } from '../Model/BillAndInvestigationRequest';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReportResponse } from '../Model/reportResponse';
import { AllInvestigationRequestEntity } from '../Model/AllInvestigationRequestEntity';
import { AllInvestigationRequestEntityContainer } from '../Model/AllInvestigationRequestEntityContainer';

@Injectable({
  providedIn: 'root'
})
export class InvestigationRequestServiceService {

  private investigationRequestUrl: string = "http://localhost:8080/investigationrequestbyadmin/";
  private saveRequestUrl: string = "http://localhost:8080/investigationrequest/";
  private adminSaveRequestUrl: string = "http://localhost:8080/investigationrequestadmin/";
  private updateRequestUrl = "http://localhost:8080/investigationrequestn/";
  private fetchPdfUrl = "http://localhost:8080/pdfreport/";
  private fetchreportImageUrl = "http://localhost:8080/imagereportdownload";
  private sendEmail = "http://localhost:8080/sendmail/";
  private fetchUserReportUrl = "http://localhost:8080/investigationuserreport/";
  private setReportUrl = "http://localhost:8080/setreport/";
  private investigationRequestUrlToUser = "http://localhost:8080/investigationrequestbyuser/";
  private fetchRequestByProviderId = "http://localhost:8080/investigationrequestbyadmin/";
  private setParameterReportUrl = "http://localhost:8080/setresultparameter/";
  private deleteReportUrl = "http://localhost:8080/deletereport/";

  private investigation = "/assets/data/investigationrequest.json";

  constructor(private _http: HttpClient) { }


  fetchinvestigationRequestbyBillid(billId, providerId): Observable<ReportResponse[]> {

    return this._http.get<ReportResponse[]>(this.investigationRequestUrl + billId + "/" + providerId);
   // return this._http.get<ReportResponse[]>(this.investigation);

  }

  fetchinvestigationRequestByOnlyProviderId(providerId): Observable<AllInvestigationRequestEntityContainer[]> {

    //return this._http.get<AllInvestigationRequestEntityContainer[]>("/assets/data/allinvestigationRequest.json");
    return this._http.get<AllInvestigationRequestEntityContainer[]>(this.fetchRequestByProviderId + providerId);

  }



  fetchinvestigationRequestToUserbyBillid(billId, mobile, providerId): Observable<ReportResponse[]> {
    return this._http.get<ReportResponse[]>(this.investigationRequestUrlToUser + billId + "/" + mobile + "/"  + providerId);
  }

  setReport(data: FormData, providerId): Observable<any> {
    return this._http.post(this.setReportUrl + providerId, data, {
      responseType: 'text' as 'json'
    });
  }

  setParameterReport(data: FormData, investigationRequestId): Observable<any> {
    return this._http.post(this.setParameterReportUrl + investigationRequestId, data, {
      responseType: 'text' as 'json'
    });
  }

  deleteReport(investigationRequestId, departmentName, billId, providerId): Observable<any> {
    return this._http.delete(this.deleteReportUrl + billId + "/" +
     investigationRequestId + "/" + departmentName + "/" + providerId, {
      responseType: 'text' as 'json'
    });
  }

  
  fetchinvestigationRequest(providerId): Observable<BillAndInvestigationRequest[]> {
    return this._http.get<BillAndInvestigationRequest[]>(this.investigationRequestUrl + providerId);
  }

  fetchUserReport(billNumber): Observable<any[]> {
    return this._http.get<any[]>(this.fetchUserReportUrl + "/" + billNumber);
  }


  saveInvestigationRequest(providerID, data: FormData): Observable<any> {
    return this._http.post(this.saveRequestUrl + providerID, data, {
      responseType: 'text' as 'json'
    });
  }


  

  adminInvestigationRequest( data: FormData, providerId): Observable<any> {
    return this._http.post(this.adminSaveRequestUrl + providerId, data, {
      responseType: 'text' as 'json'
    });
  }

  saveInvestigationRequestReport(data: FormData, investigationRequestId): Observable<any> {
    return this._http.post(this.updateRequestUrl + investigationRequestId, data, {
      responseType: 'text' as 'json'
    });
  }


  fetchPdf(departmentName, investigationRequestId, billNumber, providerId): Observable<Blob> {
    return this._http.get<Blob>(this.fetchPdfUrl + billNumber + "/" + investigationRequestId + "/" + departmentName + "/" + providerId,
     { responseType: 'blob' as 'json' });
  }


  headerOptions = {
    headers: new HttpHeaders(
      { 'content-type': 'application/json' }),
    responseType: 'text'
  }

  fetchimagereportDownload(): Observable<Blob> {
    return this._http.get<Blob>(this.fetchreportImageUrl, { responseType: 'blob' as 'json' });
  }

  sendEmailToPatient(investigationRequestId, providerId, emailAddress){
    return this._http.post(this.sendEmail + providerId + "/" + investigationRequestId, emailAddress, {
      responseType: 'text' as 'json'
    });
  }







  apiUrl = "http://localhost:8080/investigationrequestn/154";

  upload(formData) {
    return this._http.post<any>(`${this.apiUrl}`, formData, {
      responseType: 'text' as 'json',
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


}
