import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserProfileService } from './edit-user-profile.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
})
export class EditUserProfileComponent {

  constructor(private router: Router, private http: HttpClient,private edituserprofile: EditUserProfileService) { }
  userProfile = {
    userId: [''],
    userName: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    dob:'',
    gender:[''],
    address: [''],
    passwordHash: [''],
    phoneNumber: [''],
  };

  ngOnInit(): void {

    this.edituserprofile.getById().subscribe(
      (data) => {
        this.userProfile = data;

      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  saveProfile() {

    console.log(this.userProfile)
    this.edituserprofile.putById(this.userProfile).subscribe(
      (response) => {
        console.log("Vendor added Successfully", response)
      },
      (error) => {
        console.log("Error while registering", error)
      }
    );

    this.router.navigate(['/']);
  }


}

