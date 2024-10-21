import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Feedback } from './feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  feedbackList: any; // Replace with your actual data model

  constructor(private feedbackService: FeedbackService, private http :HttpClient) { }

  ngOnInit() {
    // Fetching feedback data from service
    this.feedbackList = this.feedbackService.getAllFeedback(); 
  }

  ratingcount = 0;
  totalrating = 0;
  finarating:any;
  ratingcontrol = new FormControl(0);
  feedback = new Feedback;

  GetRating(){
    this.ratingcount++;
    this.totalrating += this.ratingcontrol?.value || 0;
    // console.log(this.ratingcontrol.value)
    this.finarating = (this.totalrating/this.ratingcount).toFixed(2);

    
  }

  submitFeedbacklist(){
    this.feedback.rating=this.finarating;
    this.feedback.feedbackId=2
    this.feedback.uid=5
    this.feedback.vendorId=8
    this.feedback.timestamp="2023-09-13"
    console.log("formdata", this.feedback)
    this.feedbackService.createFeedback(this.feedback).subscribe(
      data=>{alert(`Your feedback is sumitted`)
    },
    error=>{console.log(error)});
    // this.http.post('http://localhost:8064/api/feedback/create', this.feedbackList)
  }

  }