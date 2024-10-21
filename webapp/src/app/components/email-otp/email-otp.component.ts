import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailNotificationService } from '../email-notification/email-notification.service';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-email-otp',
  templateUrl: './email-otp.component.html',
  styleUrls: ['./email-otp.component.css']
})
export class EmailOtpComponent {


  otpDialogOpen: boolean = false;

  constructor(private dialog: MatDialog) {}
  openOTPDialog() {

    this.dialog.open(EmailOtpDialogComponent, {
      panelClass: 'otp-class'
    });
  }
}

@Component({
  selector: 'app-email-otp',
  templateUrl: 'email-otp-dialog.component.html',
  styleUrls: ['./email-otp.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatCardModule],
})

export class EmailOtpDialogComponent {


  email: string = '';
  otp: string = '';
  verificationResult: string = '';
  isResendDisabled: boolean = false;
  countdown: number = 60;

  constructor(private emailService: EmailNotificationService) {}

  sendOTP() {
    this.emailService.sendOTP(this.email).subscribe({
      next: (response: any) => {
        console.log('OTP sent successfully', response);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
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

  verifyOTP() {
    if (!this.email || !this.otp) {
      Swal.fire('Validation Error', 'Email and OTP are both required', 'error');
      return;
    }
    this.emailService.verifyOTP(this.email, this.otp).subscribe({
      next: (response: any) => {
        console.log('OTP verification result:', response);
        this.verificationResult = response;

        if (response === 'OTP verified successfully.') {
          this.email = '';
          this.otp = '';
          Swal.fire('Success', 'OTP verified successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to verify OTP', 'error');
        }
      },
      error: (error) => {
        console.error('Error verifying OTP:', error);
        Swal.fire('Error', 'Failed to verify OTP', 'error');
      },
    });
  }


}
