import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:3000/vehicleInfo";
  constructor(private _http: HttpClient) { }

  getData = (): Observable<any> => this._http.get<any>(this.apiUrl);
}
