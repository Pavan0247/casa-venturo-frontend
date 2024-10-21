import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { VendorDataService } from 'src/app/services/vendor-data.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent {

  @Input() booking: any;
  @Input() vendor: any;

  public vendorId: any;
  public bookingDate: any;

  public customerName: any;
  public serviceType: any
  public location: any;
  public price: any;

  public lastUpdatedText: any;
  public startTime = new Date();

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

  public headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private vendorService: VendorDataService, private userService: UserDataService) { }

  ngOnInit() {
    this.updateLastUpdatedText();
    setInterval(this.updateLastUpdatedText, 15000 / 2); // 60000 ms = 1 minute
    this.bookingDate = new Date(this.booking.blockedDate).toDateString();
    this.vendorService.getSpecificVendor(this.vendor, this.headers).subscribe({
      next: (v) => {
        this.serviceType = v.serviceType;
        this.price = v.price

        this.userService.getAuthData(this.booking.userId, this.headers).subscribe({
          next: (v) => {
            this.customerName = v.name;
          },
          error: (e) => { },
          complete: () => { }
        })

        this.userService.getUserData(this.booking.userId,this.headers).subscribe({
          next: (v) => {
            this.location = v.address;
          },
          error: (e) => { },
          complete: () => { }
        })
      },
      error: (e) => { },
      complete: () => { }
    })
  }
}
