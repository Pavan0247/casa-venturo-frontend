import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {

  public port:any=8001;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/auth/login`, data, { responseType: 'text' });
  }

  signup(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/auth/signup`, data, { responseType: 'text' });
  }

  getVendorData(headersData: any): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/vendor-data/`, { headers: headersData });
  }

  getSpecificVendor(vendorId: any, headersData: any) {
    return this.http.get<any>(`http://localhost:${this.port}/vendor-data/${vendorId}`, { headers: headersData });
  }

  addVendor(data: any, headersData: any) {
    return this.http.post(`http://localhost:${this.port}/vendor-data/`, data, { headers: headersData, responseType: 'text' });
  }
}
