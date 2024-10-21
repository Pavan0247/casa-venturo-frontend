import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailSpecificVendorService {

  public port:any=8001

  constructor(private http:HttpClient) { }

  getAllVendorByEmail(email: any, headersData: any) {
    return this.http.get(`http://localhost:${this.port}/vendor-data/getAll/${email}`, { headers: headersData });
  }
}
