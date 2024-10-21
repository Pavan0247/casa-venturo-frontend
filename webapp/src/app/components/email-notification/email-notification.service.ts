import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {


  private apiUrl = 'http://localhost:8066/user';

  constructor(private http: HttpClient) {}

  
  sendUpdates(email: string): Observable<string> {
    const url = `${this.apiUrl}/sendEmailNotification?email=${email}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, {}, { responseType: 'text', headers }).pipe(
      map(response => response.toString())
    );
  }

  sendOTP(email: string): Observable<string> {
    const url = `${this.apiUrl}/send-otp?email=${email}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, {}, { responseType: 'text', headers }).pipe(
      map(response => response.toString())
    );
  }

  verifyOTP(email: string, otp: string): Observable<string> {
    const url = `${this.apiUrl}/verify-otp?email=${email}&otp=${otp}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, {}, { responseType: 'text', headers }).pipe(
      map(response => response.toString())
    );
  }
}
