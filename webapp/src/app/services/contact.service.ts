import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public port:any='8001'

  constructor(private http:HttpClient) { }

  sendContact(name:any,email:any,message:any){
    return this.http.get(`http://localhost:${this.port}/user/send-contact/${name}/${email}/${message}`,{responseType:'text'});
  }
}
