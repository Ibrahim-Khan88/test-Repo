import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Model/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentUrl: string = "http://localhost:8080/department";
  //private departmentUrl: string = "/assets/data/department.json";

  constructor(private _http: HttpClient) { }

  fetchDepartment(): Observable<Department[]> {
    return this._http.get<Department[]>(this.departmentUrl);
  }
}
