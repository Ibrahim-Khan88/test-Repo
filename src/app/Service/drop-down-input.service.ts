import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDownInput } from '../Model/DropDownInput';


@Injectable({
  providedIn: 'root'
})
export class DropDownInputService {

 //private fetchDropDownInputUrl: string = "http://localhost:8080/dropdowninput";
  private fetchDropDownInputUrl: string = "/assets/data/dropdown.json";

  constructor(private _http : HttpClient) { }

  fetchDropDownInput(): Observable<DropDownInput[]> {
    return this._http.get<DropDownInput[]>(this.fetchDropDownInputUrl);
  }



  // private : string = "http://localhost:8080/";

  // constructor(private _http : HttpClient) { }

  // fetchAccessories(): Observable<> {
  //   return this._http.get<>(this.fetchUrl);
  // }
}
