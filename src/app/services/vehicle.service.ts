import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private _http: HttpClient) { }

  addVehicle(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/vehicle', data);
  }

  updateVehicle(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/vehicle/${id}`, data);
  }

  getVehicleInfo(): Observable<any> {
    return this._http.get('http://localhost:3000/vehicle');
  }

  deleteVehicle(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/vehicle/${id}`);
  }
}
