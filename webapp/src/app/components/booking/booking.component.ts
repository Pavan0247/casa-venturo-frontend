import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingVendorComponent } from '../landing-vendor/landing-vendor.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  constructor(private formBuilder: FormBuilder, private landing: LandingVendorComponent, private sharingService: SharedDataService, private router: Router, private booking: BookingService,
    private snackbar: MatSnackBar, private feedback: FeedbackService) { }

  public bookingDate!: FormGroup;

  public sharedData: any;
  public datesToDisable!: Date[];
  public minDate: any;
  public maxDate: any;
  public feedbacks: any = [];

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  ngOnInit() {
    this.bookingDate = this.formBuilder.group({
      blockedDate: ['', Validators.required]
    });
    this.sharedData = this.sharingService.getSharedDate();
    localStorage.setItem('price', this.sharedData.price);
    var length = this.sharedData.bookedDates.length;

    this.datesToDisable = []
    for (var i = 0; i < length; i++) {
      const dateArray = this.sharedData.bookedDates[i].blockedDate;
      const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
      this.datesToDisable.push(dateObject);
    }

    this.minDate = new Date(this.sharedData.startDate);
    if (this.minDate < new Date()) {
      this.minDate = new Date();
    }
    this.maxDate = new Date(this.sharedData.endDate);

    this.feedback.loadFeedbacks(this.sharedData.vendorId).subscribe({
      next: (v) => { this.feedbacks = v },
      error: (e) => { this.snackbar.open('Error Loading feedbacks', 'Close') },
      complete: () => { }
    })

  }

  dateFilter = (date: Date | null): boolean => {
    const day = date?.getDay();
    return !this.datesToDisable.some(disabledDate =>
      new Date(disabledDate).toDateString() === new Date(date as Date).toDateString()
    );
  };
  gotoPayment() {

    // Create a new Date object from the current 'blockedDate' value
    const currentDate = new Date(this.bookingDate.value.blockedDate);

    // Add 1 day to the current date
    currentDate.setDate(currentDate.getDate() + 1);

    // Update the 'blockedDate' value in your form group
    this.bookingDate.patchValue({
      blockedDate: currentDate.toISOString().split('T')[0]
    });

    const bookingData = {
      userId: localStorage.getItem('email'),
      blockedDate: this.bookingDate.value.blockedDate
    };

    this.booking.bookAppointment(this.sharedData.vendorId, bookingData, this.headers).subscribe({
      next: (v) => {
        this.booking.updateBlockedDate(this.sharedData.vendorId, this.bookingDate.value, this.headers).subscribe({
          next: (v) => {
            this.booking.sendConfirmationEmail(localStorage.getItem('email')).subscribe({
              next: (v) => { },
              error: (e) => { },
              complete: () => { }
            })
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
      complete: () => { this.router.navigate(['payment']); }
    })


  }

  close() {
    this.landing.popup = false;
  }

  setLocally() {
    localStorage.setItem('blockedDate', this.bookingDate.value.blockedDate);
  }
}
