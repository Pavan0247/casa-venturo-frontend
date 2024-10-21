import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  public getServices():Observable<any>{
    const url = 'http://localhost:8000/news'
    return this.http.get<any>(url);    
  }

  public searchByKeyword(keyword: string, options: string){
    let url =  'http://localhost:8000/news'
    if (options === 'author'){
      url = url + "/author/"+ keyword;
    }else if( options === 'title'){
      url = url + "/title/"+ keyword;
    }
    return this.http.get<any>(url); 
  }
}
