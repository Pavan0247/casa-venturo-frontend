import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {

  constructor(private http: HttpClient) { }

  public getById():Observable<any>{
    const url = 'http://localhost:8082/v1/userprofile/1'
    return this.http.get<any>(url);    
  }

  public putById(userProfile:any):Observable<any>{
    const url = 'http://localhost:8082/v1/userprofile/1'
    return this.http.put<any>(url,userProfile);

  }
}
