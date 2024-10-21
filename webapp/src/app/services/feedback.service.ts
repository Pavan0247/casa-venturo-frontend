import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public port:any=8001;

  constructor(private http:HttpClient) { }

  public postFeedback(email:any,feedback:any){
    return this.http.post(`http://localhost:${this.port}/feedback/${email}`,feedback);
  }

  public loadFeedbacks(email:any){
    return this.http.get(`http://localhost:${this.port}/feedback/${email}`);
  }
}
