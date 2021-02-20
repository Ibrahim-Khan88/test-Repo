import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigation } from '../Model/Invesigation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {

  private saveInvestigationUrl = "http://localhost:8080/createinvestigation/";
  private updateInvestigationUrl = "http://localhost:8080/investigation/";
  private deleteInvestigationUrl = "http://localhost:8080/investigation/";
  private investigationUrlAdmin: string = "http://localhost:8080/investigation";
  private investigationCagoryUrl: string = "http://localhost:8080/investigation";
  private investigationFetchUrl: string = 'http://localhost:8080/investigationprovider/';
  private investigationNameFetchUrl: string = 'http://localhost:8080/investigationname/';
  private fetchformat: string = "http://localhost:8080/investigation/";

  //private investigationFetchUrl: string = "/assets/data/investigation.json";
  // http://localhost:8080/createinvestigation/1/1/1/1
  // this.saveInvestigationUrl + providerId + "/" + deptId +"/"+ subGroupId +"/" + specimanId
  constructor(private _http: HttpClient) { }

  saveInvestigation(investigation, deptId, providerId, specimanId, subGroupId): Observable<any> {
    return this._http.post(this.saveInvestigationUrl + providerId +"/" + deptId + "/" + subGroupId + "/" + specimanId, investigation, {
      responseType: 'text' as 'json'
    });
  }

  updateInvestigation(providerID, categoryId, investigationId, investigation): Observable<any> {
    return this._http.post(this.updateInvestigationUrl + providerID + "/" + investigationId + "/" + categoryId, investigation, {
      responseType: 'text' as 'json'
    });
  }

  deleteInvestigation(investigationId): Observable<any> {
    return this._http.delete(this.deleteInvestigationUrl + investigationId, {
      responseType: 'text' as 'json'
    });
  }

  fetchInvestigationByProviderId(providerId): Observable<Investigation[]> {
    return this._http.get<Investigation[]>(this.investigationFetchUrl + providerId);
    //return this._http.get<Investigation[]>("/assets/data/investigationlist.json");
  }

  fetchInvestigationByAdmin(): Observable<Investigation[]> {
    return this._http.get<Investigation[]>(this.investigationUrlAdmin);
  }

  fetchInvestigationByInvestigationIdList(selectedItems): Observable<Investigation[]> {
    return this._http.get<Investigation[]>(this.investigationUrlAdmin + "/" + selectedItems);
  }
  
  fetchInvestigationByCategoryId(catagoryId): Observable<Investigation[]> {
    return this._http.get<Investigation[]>(this.investigationCagoryUrl + "/" + catagoryId);
  }



  fetchInvestigationNameByProviderId(providerId): Observable<string[]>{
    return this._http.get<string[]>(this.investigationNameFetchUrl + providerId);
  }

  fetchFormat(providerId, investigationName) {
    return this._http.get<any>(this.fetchformat + providerId + "/" + investigationName);
  }

}
