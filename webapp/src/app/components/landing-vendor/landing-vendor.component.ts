import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/search.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-landing-vendor',
  templateUrl: './landing-vendor.component.html',
  styleUrls: ['./landing-vendor.component.css'],
})
export class LandingVendorComponent {
  public vendorList: any;

  public popup: boolean = false;

  constructor(private data: VendorDataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'user') {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
      this.data.getVendorData(headers).subscribe({
        next: (v) => {
          this.vendorList = v;
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
        complete: () => { },
      });
    } else {
      this.snackbar.open('User privilges are required', 'Close');
    }
  }
}
