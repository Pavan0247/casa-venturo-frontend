import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDataService } from 'src/app/services/user-data.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent {

  public userData: any;
  public allVendorArray: any[] = [];
  public jobsArray: any[] = [];
  public bookings: any[] = [];

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private dataService: VendorDataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    if(localStorage.getItem('role')==='user'){
      this.dataService.getVendorData(this.headers).subscribe({
        next: (v) => {
          this.allVendorArray = v
          this.allVendorArray.forEach((element: any) => {
            if (element.jobs.length > 0) {
              this.jobsArray = element.jobs;
              this.jobsArray.forEach((ele: any) => {
                if (ele.userId === localStorage.getItem('email')) {
                  this.bookings.push({
                    "vendorId":element.vendorId,
                    "bookingDate": ele.blockedDate,
                    "serviceType": element.serviceType,
                    "price": element.price,
                    "location": element.location,
                    "vendorName": element.vendorName,
                    "description": element.description
                  })
                }
              })
            }
          });
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
    else{
      this.snackbar.open('User priviliges are required','Close');
    }
  }
}
