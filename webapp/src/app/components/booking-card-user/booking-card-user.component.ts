import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/services/feedback.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-booking-card-user',
  templateUrl: './booking-card-user.component.html',
  styleUrls: ['./booking-card-user.component.css']
})
export class BookingCardUserComponent {
  @Input() booking: any;


  public bookingDate: any;

  public show:any=false;

  public feedbackForm!:FormGroup;
  public lastUpdatedText: any;
  public startTime = new Date();

  constructor(private feedback:FeedbackService,private fb:FormBuilder,private snackbar:MatSnackBar){

  }

  public updateLastUpdatedText = () => {
    const currentTime = new Date();
    const elapsedMinutes = Math.floor((currentTime.getTime() - this.startTime.getTime()) / (1000 * 60));
    this.lastUpdatedText = `Last updated ${elapsedMinutes} mins ago`;
  };

  serviceTypeImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/cleaning.svg',
    'Gardening': 'assets/images/gardening.svg',
    'Electrician': 'assets/images/electrician.svg',
    'Plumbing': 'assets/images/plumbing.svg',
    'Painting': 'assets/images/painting.svg',
  };

  display(){
    this.show=!this.show
  }

  submit(){
    this.show=!this.show;

    this.feedback.postFeedback(this.booking.vendorId,this.feedbackForm.value).subscribe({
      next:(v)=>{this.snackbar.open('Feedback sent successfully','Close')},
      error:(e)=>{this.snackbar.open('Feedback was not sent','Close')},
      complete:()=>{}
    })
  }

  ngOnInit() {
    this.updateLastUpdatedText();
    setInterval(this.updateLastUpdatedText, 15000/2); // 60000 ms = 1 minute
    this.bookingDate=new Date(this.booking.bookingDate).toDateString();


    this.feedbackForm=this.fb.group({
      message:['',Validators.required]
    })
  }
}
