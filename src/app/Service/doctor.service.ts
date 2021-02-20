import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Model/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private fetchDoctorUrl: string = "http://localhost:8080/doctor/";
 // private fetchDoctorUrl: string = "/assets/data/doctor.json";

  constructor(private _http : HttpClient) { }

  fetchDoctor(providerId): Observable<Doctor[]> {
    return this._http.get<Doctor[]>(this.fetchDoctorUrl + providerId);
    //return this._http.get<Doctor[]>("/assets/data/doctor.json");
  }
}
