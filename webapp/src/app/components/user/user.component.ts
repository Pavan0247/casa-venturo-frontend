import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit{
  constructor(private router: Router, private http: HttpClient,private UserService: UserService) {}
  userProfile = {
    userId: [''],
    userName: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    dob: '',
    gender: [''],
    address: [''],
    passwordHash: [''], 
    phoneNumber: ['']
  };

  // userProfile:any[]=[];
  isEditable = false;

  ngOnInit(): void {
  
    this.UserService.getById().subscribe(
      (data) => {
        this.userProfile = data;
        // console.log(data);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  goToEditPage() {
    this.router.navigate(['/editprofile']);
  }
}



