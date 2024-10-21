import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailSpecificVendorService } from 'src/app/services/email-specific-vendor.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-landing-actual-vendor',
  templateUrl: './landing-actual-vendor.component.html',
  styleUrls: ['./landing-actual-vendor.component.css']
})
export class LandingActualVendorComponent {
  constructor(private vendorserice: EmailSpecificVendorService,
    private snackbar:MatSnackBar) { }

  public show: boolean = false;
  public vendorList: any;

  change() {
    this.show = !this.show
  }

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  ngOnInit() {
    if(localStorage.getItem('role')==='vendor'){
      this.vendorserice.getAllVendorByEmail(localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          this.vendorList = v
        },
        error: (e) => { 
          var mssg=e.error.trace.split(".");
          var val=mssg[2];
          val=val.split(":");
          val=val[0]
          if(val==='ExpiredJwtException')
          {
            this.snackbar.open('Session Expired, login again','close') 
          }
          else{
            this.snackbar.open('Internal Server Error','close') 
          }
        },
        complete: () => { }
      })
    }
    else{
      this.snackbar.open('Vendor priviliges are required','Close')
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollButton = document.getElementById('scroll');
    if (scrollButton) {
      // Show the button when the user has scrolled down a certain amount
      scrollButton.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
    }
  }
}
