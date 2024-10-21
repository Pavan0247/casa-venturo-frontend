import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { EmailSpecificVendorService } from 'src/app/services/email-specific-vendor.service';
import { LandingActualVendorComponent } from '../landing-actual-vendor/landing-actual-vendor.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {

  constructor(private booking:BookingService,private parent:LandingActualVendorComponent,private snackbar:MatSnackBar){}

  @Input() data: any;

  public startDate: any;
  public endDate: any;
  public datePosted: any;

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  serviceTypeAvatarImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/avatar-vendor-1.png',
    Gardening: 'assets/images/avatar-vendor-2.png',
    Electrician: 'assets/images/avatar-vendor-2.png',
    Plumbing: 'assets/images/avatar-vendor-3.png',
    Painting: 'assets/images/avatar-vendor-1.png',
  };

  serviceTypeImages: { [key: string]: string } = {
    'Home Cleaning': 'assets/images/cleaning.svg',
    Gardening: 'assets/images/gardening.svg',
    Electrician: 'assets/images/electrician.svg',
    Plumbing: 'assets/images/plumbing.svg',
    Painting: 'assets/images/painting.svg',
  };

  ngOnInit() {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.datePosted = this.data.datePosted;
    this.datePosted = new Date(this.datePosted);

    const day2 = this.datePosted.getDate();
    const month2 = this.datePosted.getMonth();
    const year2 = this.datePosted.getFullYear();
    this.datePosted = `${day2} ${monthNames[month2 - 1]} ${year2}`;

    // this.startDate = this.data.startDate;
    // const year0 = this.startDate[0];
    // const month0 = this.startDate[1];
    // const day0 = this.startDate[2];
    // this.startDate = `${day0} ${monthNames[month0 - 1]} ${year0}`;

    // this.endDate = this.data.endDate;
    // const year1 = this.endDate[0];
    // const month1 = this.endDate[1];
    // const day1 = this.endDate[2];
    // this.endDate = `${day1} ${monthNames[month1 - 1]} ${year1}`;

    this.startDate=new Date(this.data.startDate).toDateString();
    this.endDate=new Date(this.data.endDate).toDateString();
  }

  delete(){
    this.booking.deleteServiceById(this.data.vendorId,this.headers).subscribe({
      next:(v)=>{this.parent.ngOnInit(),this.snackbar.open('Deleted','Close')},
      error:(e)=>{this.snackbar.open('Failed To Delete','Close')},
      complete:()=>{}
    })
  }
}
