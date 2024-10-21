import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailSpecificVendorService } from 'src/app/services/email-specific-vendor.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-vendor-bookings',
  templateUrl: './vendor-bookings.component.html',
  styleUrls: ['./vendor-bookings.component.css']
})
export class VendorBookingsComponent {
  public vendorArrayData: any;
  public vendorData: any;
  public vendorMapping: any[] = [];

  public arrayOfBooking: any[] = [];

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private vendor: EmailSpecificVendorService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'vendor') {
      this.vendor.getAllVendorByEmail(localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          this.vendorArrayData = v;
          for (var i = 0; i < this.vendorArrayData.length; i++) {
            const jobsArray = this.vendorArrayData[i].jobs;
            jobsArray.forEach((element: any) => {
              if (element != null) {
                this.arrayOfBooking.push(element);
                this.vendorMapping.push(this.vendorArrayData[i].vendorId);
              }
            });
          }
        },
        error: (e) => {
          var mssg = e.error.trace.split(".");
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
        complete: () => { }
      })
    }
    else {
      this.snackbar.open('Vendor priviliges are required', 'Close');
    }
  }
}
