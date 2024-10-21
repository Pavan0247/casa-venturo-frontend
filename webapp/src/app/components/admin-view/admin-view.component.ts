import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { UserDataService } from 'src/app/services/user-data.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent {

  public showApiHealth:boolean=false;

  public vendorList: any;
  public vendorBase: any;

  public userBase: any;
  public labels: any[] = [];
  public data: any = [];

  public labelForCity: any[] = [];
  public labelForPrice: any[] = [];

  public hashMap: { [key: string]: number } = {};
  public hashMap2: { [key: string]: number } = {};

  constructor(
    private dataService: VendorDataService,
    private userService: UserDataService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  changeView(){
   this.router.navigate(['admin','dashboard'])
  }

  changeView1(){
    this.router.navigate(['admin','api-health'])
   }

  ngOnInit() {
    if (localStorage.getItem('role') === 'admin') {

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.userService.getAllUsers(headers).subscribe({
        next: (v) => { this.userBase = v.length },
        error: (er) => {
          var mssg = er.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => { this.vendor_user_pie_chart(); },
      });

      this.dataService.getVendorData(headers).subscribe({
        next: (v) => {
          this.vendorList = v;
          this.vendorBase = this.vendorList.length;
          this.populateMap();
          this.vendor_location_base();
          this.checkPricesInEachCity();
          this.city_price_chart();
        },
        error: (er) => {
          var mssg = er.error.trace.split(".");
          var val = mssg[2];
          val = val.split(":");
          val = val[0]
          if (val === 'ExpiredJwtException') {
            this.snackbar.open('Session Expired, login again', 'close')
          }
          else {
            this.snackbar.open('Internal Server Error', 'close')
          }
        },
        complete: () => {
          this.pushDataToArrays();
          this.pushToArrays2();
        },
      });
    }
    else {
      this.snackbar.open('Administrative priviliges are required', 'Close')
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  pushDataToArrays() {
    for (const key in this.hashMap) {
      if (this.hashMap.hasOwnProperty(key)) {
        const value = this.hashMap[key];
        this.labels.push(key);
        this.data.push(value);
      }
    }
  }

  populateMap() {
    this.vendorList.forEach((element: any) => {
      var key = element.location;
      if (this.hashMap.hasOwnProperty(key)) {
        this.hashMap[key] += 1;
      } else {
        this.hashMap[key] = 1;
      }
    });
  }

  pushToArrays2() {
    for (const key in this.hashMap2) {
      if (this.hashMap2.hasOwnProperty(key)) {
        const value = this.hashMap2[key];
        this.labelForCity.push(key);
        this.labelForPrice.push(value);
      }
    }
  }

  checkPricesInEachCity() {
    this.vendorList.forEach((element: any) => {
      var key = element.location;
      if (this.hashMap2.hasOwnProperty(key)) {
        const value = this.hashMap2[key];
        this.hashMap2[key] = (value + element.price) / 2;
      } else {
        this.hashMap2[key] = element.price;
      }
    });
  }

  city_price_chart() {
    new Chart(document.getElementById('avg-city-price') as any, {
      type: 'bar',
      data: {
        labels: this.labelForCity,
        datasets: [
          {
            label: 'Average price of Service per City',
            data: this.labelForPrice,
            borderWidth: 1,
          },
        ],
      },
    });
  }

  vendor_user_pie_chart() {
    new Chart(document.getElementById('vendor_to_user_ratio') as any, {
      type: 'pie',  // Change the chart type to 'pie'
      data: {
        labels: ['vendor', 'user'],
        datasets: [
          {
            label: 'Vendor to User Person Base',
            data: [this.vendorBase, this.userBase],
            borderWidth: 1,
            backgroundColor: [  // Specify background colors for each segment of the pie chart
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)'
              // You can add more colors as needed for additional data points
            ],
          },
        ],
      },
    });
  }

  vendor_location_base() {
    new Chart(document.getElementById('vendor-location-size') as any, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Vendors in Each City',
            data: this.data,
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
