import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailVerifyService } from 'src/app/services/email-verify.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private router: Router, private formBuilder: FormBuilder, private snackbar: MatSnackBar, private service: UserDataService, private emailService: EmailVerifyService) { }

  public email!: FormGroup;
  public getOtp!: FormGroup;
  public changePass!: FormGroup;

  public showEmailSection: any = true;
  public showOtpSection: any = false;
  public showPasswordSection: any = false;

  ngOnInit() {
    this.email = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.getOtp = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    })

    this.changePass = this.formBuilder.group({
      password: ['', Validators.required]
    })
  }

  confirmMail() {
    this.emailService.getOtp(this.email.value.email).subscribe({
      next: (v) => {
        this.snackbar.open('OTP sent Successfully', 'Close'),
          this.showEmailSection = false;
          this.showOtpSection = true;
          this.showPasswordSection = false;
          console.log(v)
      },
      error: (e) => { this.snackbar.open('Failed to send OTP', 'Close') },
      complete: () => { }
    })
  }

  confirmOtp() {
    this.emailService.verifyOtp(this.email.value.email, this.getOtp.value.otp).subscribe({
      next: (v) => {
        this.snackbar.open('OTP verified Successfully', 'Close');
        this.showEmailSection = false;
        this.showOtpSection = false;
        this.showPasswordSection = true;
      },
      error: (e) => { this.snackbar.open('Failed to verify OTP', 'Close') },
      complete: () => { }
    })
  }

  resetPassword() {
    var pass = document.getElementById('dummy') as any;
    pass = pass.value;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    if (pass === this.changePass.value.password) {
      this.service.updateAuthData(this.changePass.value, this.email.value.email, headers).subscribe({
        next: (v) => { this.snackbar.open('Password Changed Successfully', 'Close') },
        error: (e) => { this.snackbar.open('Failed to change password', 'Close') },
        complete: () => { this.router.navigate(['']) }
      })
    }
    else {
      this.snackbar.open('Passwords dont match', 'Close')
    }

  }

  goToLogin() {
    this.router.navigate(['login'])
  }
}
