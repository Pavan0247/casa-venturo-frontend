import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailVerifyService } from 'src/app/services/email-verify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(private data: UserDataService, private formBuilder: FormBuilder, private router: Router, private location: Location, private snackbar: MatSnackBar, private email: EmailVerifyService) {
    this.emailVerified = false;
  }

  public authForm!: FormGroup;
  public userForm!: FormGroup;
  public OTP: any;

  public authData: any;
  public userData: any;

  public test: any = 'hie'
  public emailVerified!: boolean;

  isResendDisabled: boolean = false;
  countdown: number = 60;

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.userForm = this.formBuilder.group({
      dob: ['', Validators.required, this.dateNotExceedsCurrent.bind(this)],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
      address: ['']
    })
    this.getDataFromBackend();
  }

  getOtp() {
    this.email.getOtp(localStorage.getItem('email')).subscribe({
      next: (response: any) => {
        console.log('OTP sent successfully', response);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'OTP Sent successfully'
        })
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
        Swal.fire('Error', 'Failed to send OTP', 'error');
      },
    });
    this.isResendDisabled = true;

    const timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(timerInterval);
        this.isResendDisabled = false;
        this.countdown = 60;
      }
    }, 1000);
  }

  verifyOtp() {
    const secretInput = document.getElementById('secret') as HTMLInputElement;
    if (secretInput) {
      this.OTP = secretInput.value;
    }
    this.email.verifyOtp(localStorage.getItem('email'), this.OTP).subscribe({
      next: (v) => {
        this.emailVerified = true;
        Swal.fire('Success', 'OTP verified successfully', 'success');
      },
      error: (e) => { Swal.fire('Error', 'Invalid OTP', 'error'); },
      complete: () => { }
    })
  }

  changeValue() {
    this.location.back();
  }

  dateNotExceedsCurrent(control: AbstractControl): ValidationErrors | null {
    const selectedDate = control.value;

    // Get the current date
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return { exceedsCurrentDate: true };
    }

    return null;
  }

  onSubmit() {
    var secondLogin = localStorage.getItem('secondLogin');
    if (secondLogin === "true") {
      this.data.updateUserData({ ...this.userForm.value, emailVerified: this.emailVerified }, localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required, this.dateNotExceedsCurrent.bind(this)]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
            address: [v.address, [Validators.required]]
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

      this.data.updateAuthData(this.authForm.value, localStorage.getItem('email'), this.headers).subscribe({
        next: (v) => {
          this.authForm = this.formBuilder.group({
            name: [v.name, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
            userName: [v.userName, [Validators.required]],
            email: [v.email, [Validators.required, Validators.email]]
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
    }
    else {
      this.data.addUserData({ ...this.userForm.value, email: localStorage.getItem('email'), emailVerified: this.emailVerified }, this.headers).subscribe({
        next: (v) => {

          const birth = new Date(v.dob)
          this.userForm = this.formBuilder.group({
            dob: [birth, [Validators.required, this.dateNotExceedsCurrent.bind(this)]],
            gender: [v.gender, [Validators.required]],
            phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
            address: [v.address, [Validators.required]]
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

    if (localStorage.getItem('role') === 'vendor') {
      this.router.navigate(['landing', 'vendor'])
    } else if (localStorage.getItem('role') === 'user') {
      this.router.navigate(['landing', 'user'])
    }
    else if (localStorage.getItem('role') === 'admin') {
      this.router.navigate(['admin', 'dashboard'])
    }
  }

  //TODO
  changePass() {
    this.router.navigate(['forgot-password'])
  }

  getDataFromBackend() {
    this.data.getAuthData(localStorage.getItem('email'), this.headers).subscribe({
      next: (v) => {
        this.authData = v;
        this.authForm = this.formBuilder.group({
          name: [v.name, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
          userName: [v.userName, [Validators.required]],
          email: [v.email, [Validators.required, Validators.email]]
        })
      },
      error: (e) => {
        this.snackbar.open('Error while fetching details', 'Close');
      },
      complete: () => {
      }
    })
    this.data.getUserData(localStorage.getItem('email'), this.headers).subscribe({
      next: (v) => {
        this.userData = v;
        const birth = new Date(v.dob)
        this.emailVerified = v.emailVerified;
        this.userForm = this.formBuilder.group({
          dob: [birth, [Validators.required, this.dateNotExceedsCurrent.bind(this)]],
          gender: [v.gender, [Validators.required]],
          phoneNumber: [v.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
          address: [v.address, [Validators.required]]
        })
      },
      error: (e) => {
        this.snackbar.open('Error while fetching details', 'Close');
      },
      complete: () => {
      }
    })

  }
}
