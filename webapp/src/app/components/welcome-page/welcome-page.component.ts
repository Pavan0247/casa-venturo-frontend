import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  constructor(private router:Router){}
  gotoVendorLogin(){
    this.router.navigate(['vendorlogin'])
  }
  

  //    gotoVendor(){
  //  this.router.navigate(['auth'])
  //}

  gotoUserLogin(){
    this.router.navigate(['userlogin'])
  }
}

