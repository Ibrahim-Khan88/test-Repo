import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LabDoctor } from '../Model/LabDoctor';

@Injectable({
  providedIn: 'root'
})
export class LabDoctorService {

  //private fetchLabDoctorUrl: string = "http://localhost:8080/labdoctor/";
  private fetchLabDoctorUrl: string = "/assets/data/labDoctor.json";
  private assignLabDoctorUrl: string = "http://localhost:8080/labdoctor/";

  constructor(private _http : HttpClient) { }

  fetchLabDoctor(providerId): Observable<LabDoctor[]> {
  // return this._http.get<LabDoctor[]>(this.fetchLabDoctorUrl + providerId);
   return this._http.get<LabDoctor[]>("/assets/data/labDoctor.json");
  }

  assignLabDoctor(labDoctorName, investigationRequestId): Observable<any> {
    return this._http.post(this.assignLabDoctorUrl + investigationRequestId , labDoctorName, {
      responseType: 'text' as 'json'
    });
  }


}
