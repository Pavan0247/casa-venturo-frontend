import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.css']
})
export class BackBtnComponent {
  constructor(private location:Location){}

  onClick(){
    this.location.back();
  }
}
