import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

	public port:any=8001;
  
  constructor(private http: HttpClient) {

	}
  
  createOrder(order:any): Observable<any> {
		return this.http.post(`http://localhost:${this.port}/pg/createOrder`, {
		customerName: order.name,
		email: order.email,
		phoneNumber: order.phone,
		amount: order.amount
		}, httpOptions);
	}

}
