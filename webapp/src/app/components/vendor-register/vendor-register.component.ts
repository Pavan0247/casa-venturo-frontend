import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { LandingActualVendorComponent } from '../landing-actual-vendor/landing-actual-vendor.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css'],
})
export class VendorRegisterComponent {
  public vendorRegistrationForm!: FormGroup;
  public vendorname: any = '';

  currentDate: Date = new Date();

  constructor(private formBuilder: FormBuilder, private router: Router, private vendorService: VendorDataService, private parent: LandingActualVendorComponent, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.vendorname = localStorage.getItem('username');
    this.vendorRegistrationForm = this.formBuilder.group({
      email: [localStorage.getItem('email')],
      vendorName: [localStorage.getItem('username')],
      serviceType: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validator: this.dateRangeValidator });

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('past-date')?.setAttribute('min', currentDate);
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDateControl = control.get('startDate');
    const endDateControl = control.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && startDate > endDate) {
        return { invalidDateRange: true };
      }
    }

    return null;
  }

  registerVendor() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.vendorService.addVendor(this.vendorRegistrationForm.value, headers)
      .subscribe({
        next: (v) => { this.snackbar.open('Service added successfully', 'Close'); },
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
        complete: () => {
          this.parent.change()
          this.parent.ngOnInit();
        },
      });
    this.vendorRegistrationForm.reset();
  }
}
