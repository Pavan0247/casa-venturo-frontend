import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmailNotificationService } from './email-notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent {

  constructor(private dialog: MatDialog) {}
  openNotificationDialog() {
    this.dialog.open(EmailNotificationDialogComponent);
  }

}

@Component({
  selector: 'app-email-notification',
  templateUrl: 'email-notification-dialog.component.html',
  styleUrls: ['./email-notification.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class EmailNotificationDialogComponent {
  email : string = ''
  constructor(private emailService: EmailNotificationService) {}

  ngOnInit(): void {
  // Check if the page is being reloaded
  if (performance.getEntriesByType('navigation')[0].entryType) {
    Swal.fire({
      title: 'Do you want email notifications from "CASA VENTURO"?',
      input: 'email', // Specify input type as email
      inputPlaceholder: 'Enter your email',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your email';
        } else {
          return null; // Return null when the input is valid
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the "Yes" button click here
        this.email = result.value; // Store the email in the component variable
        this.sendEmailNotification(this.email).subscribe({
          next: () => {
            Swal.fire('Email notifications enabled!', '', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error enabling email notifications', 'error');
          },
        });
      } else {
        // Handle the "No" button click here
        Swal.fire('Email notifications disabled', '', 'info');
      }
    });
  }
}

  sendEmailNotification(email: string) {
    return this.emailService.sendUpdates(this.email);
  }
  
}

