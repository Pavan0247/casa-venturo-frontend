import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public port:any='8001'

  constructor(private http: HttpClient) { }

  bookAppointment(vendorId: any, data: any, headerData: any) {
    return this.http.put(`http://localhost:${this.port}/vendor-data/book/job/${vendorId}`, data, { headers: headerData })
  }

  updateBlockedDate(vendorId:any,data:any,headerData:any){
    return this.http.put(`http://localhost:${this.port}/vendor-data/book/${vendorId}`,data,{headers:headerData, responseType:'text'});
  }

  deleteServiceById(vendorId:any,headerData:any){
    return this.http.delete(`http://localhost:${this.port}/vendor-data/${vendorId}`,{headers:headerData, responseType:'text'});
  }

  sendConfirmationEmail(email:any){
    return this.http.get(`http://localhost:${this.port}/user/sendEmailNotification/${email}`,{responseType:'text'});
  }
}
