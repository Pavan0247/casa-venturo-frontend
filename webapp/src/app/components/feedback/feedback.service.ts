import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8064/feedback/all'; 
  private apiUrl1 = 'http://localhost:8064/feedback/create'; 
  private apiUrl2 = 'http://localhost:8064/feedback/{id}'; 
  private apiUrl3 = 'http://localhost:8064/feedback/delete/{id}'; 

  constructor(private http: HttpClient) {}

  getAllFeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}`, feedback);
  }
  getFeedbackById(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl2}`);
  }
  deleteFeedback(feedback: any): Observable<any> { 
    return this.http.delete<any>(`${this.apiUrl3}`, feedback);

  }

  
}
