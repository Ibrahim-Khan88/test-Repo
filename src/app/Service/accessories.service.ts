import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessories } from '../Model/Accessories';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  private fetchAccessoriesUrl: string = "http://localhost:8080/accessories";
  //private fetchAccessoriesUrl = "/assets/data/accessories.json";


  constructor(private _http : HttpClient) { }

  fetchAccessories(): Observable<Accessories[]> {
    return this._http.get<Accessories[]>(this.fetchAccessoriesUrl);
  }
}
