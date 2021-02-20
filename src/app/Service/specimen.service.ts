import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specimen } from '../Model/Specimen';

@Injectable({
  providedIn: 'root'
})
export class SpecimenService {

  private fetchSpecimenUrl: string = "http://localhost:8080/specimen";
  //private fetchSpecimenUrl: string = "/assets/data/speciman.json";

  constructor(private _http : HttpClient) { }

  fetchSpecimen(): Observable<Specimen[]> {
    return this._http.get<Specimen[]>(this.fetchSpecimenUrl);
  }
}
