import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubGroup } from '../Model/SubGroup';

@Injectable({
  providedIn: 'root'
})
export class SubGroupService {

  private fetchSubGroupUrl: string = "http://localhost:8080/subGroup";
 // private fetchSubGroupUrl: string = "/assets/data/subgroup.json";

  constructor(private _http : HttpClient) { }

  fetchSubGroup(): Observable<SubGroup[]> {
    return this._http.get<SubGroup[]>(this.fetchSubGroupUrl);
  }
}
