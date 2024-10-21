import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-landing-dashboard',
  templateUrl: './vendor-landing-dashboard.component.html',
  styleUrls: ['./vendor-landing-dashboard.component.css']
})
export class VendorLandingDashboardComponent {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  gotoVendor()
  
  
  
  
  {
    this.router.navigate(['vendor-registration'])
  }

}
