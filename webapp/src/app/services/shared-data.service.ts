import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {


  private sharedData: any;

  constructor() { }

  setSharedDate(data:any){
    this.sharedData=data;
  }

  getSharedDate(){
    return this.sharedData;
  }
}
