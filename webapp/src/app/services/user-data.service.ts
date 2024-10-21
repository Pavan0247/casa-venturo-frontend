import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public port: any = 8001;

  constructor(private http: HttpClient) { }

  firstLogin(email: any, headersData: any) {
    return this.http.get<any>(`http://localhost:${this.port}/user-data/${email}`, { headers: headersData });
  }

  getAllUsers(headersData: any) {
    return this.http.get<any>(`http://localhost:${this.port}/auth-data/getAll`, { headers: headersData });
  }

  getAuthData(email: any, headersData: any) {
    return this.http.get<any>(`http://localhost:${this.port}/auth-data/${email}`, { headers: headersData })
  }

  getUserData(email: any, headersData: any) {
    return this.http.get<any>(`http://localhost:${this.port}/user-data/${email}`, { headers: headersData });
  }

  updateUserData(data: any, email: any, headersData: any) {
    return this.http.put<any>(`http://localhost:${this.port}/user-data/${email}`, data, { headers: headersData });
  }

  updateAuthData(data: any, email: any, headersData: any) {
    return this.http.put<any>(`http://localhost:${this.port}/auth-data/${email}`, data, { headers: headersData });
  }

  addUserData(data: any, headersData: any) {
    return this.http.post<any>(`http://localhost:${this.port}/user-data/userprofile`, data, { headers: headersData });
  }
}
