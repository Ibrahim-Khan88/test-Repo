import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamGroup } from '../Model/ParamGroup';

@Injectable({
  providedIn: 'root'
})
export class ParamGroupService {

  private fetchParamGroupUrl: string = "http://localhost:8080/paramgroup/";
  //private fetchParamGroupUrl: string = "/assets/data/paramgroup.json";

  constructor(private _http : HttpClient) { }

  fetchParamGroup(departmentId, subGroupId): Observable<ParamGroup[]> {
    return this._http.get<ParamGroup[]>(this.fetchParamGroupUrl + departmentId + "/" + subGroupId);
    //return this._http.get<ParamGroup[]>("/assets/data/paramgroup.json");
  }
}
