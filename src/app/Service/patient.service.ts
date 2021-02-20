import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http : HttpClient) { }


  private updateBillUrl: string = "http://localhost:8080/patient/";

  updateBill(paymentAmount: FormData, billNumber): Observable<any> {
    return this._http.post(this.updateBillUrl + billNumber, paymentAmount, {
      responseType: 'text' as 'json' 
    });
  }



}
