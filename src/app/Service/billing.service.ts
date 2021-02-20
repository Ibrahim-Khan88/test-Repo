import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Billing } from '../Model/Billing';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BillingService {


  //$investiationRequestParameterId = new EventEmitter();
  private _investiationRequestParameterIdSourch = new Subject<string>();
  investiationRequestParameterId$ = this._investiationRequestParameterIdSourch.asObservable();

  private fetchBillUrl: string = "http://localhost:8080/billing/";
  private saveBillUrl: string = "http://localhost:8080/billing/";

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };

  constructor(private _http : HttpClient) { }

  fetchBill(investigationRequestId): Observable<Billing> {
    return this._http.get<Billing>(this.fetchBillUrl + investigationRequestId);
  }


  saveBill(Bill, PatientId): Observable<any> {
    return this._http.post(this.saveBillUrl + PatientId, Bill, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      responseType: 'text' as 'json' 
    });
  }

  setParameterValue(investiationRequestId){
    
   // this.$investiationRequestParameterId.emit(investiationRequestId);
    this._investiationRequestParameterIdSourch.next(investiationRequestId);
    console.log("investiationRequestId from service class " + investiationRequestId);
  }


}
