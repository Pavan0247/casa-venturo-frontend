import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthSignUpComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({}); // Define the form group
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

 
  ngOnInit(): void {
    //signup -
    this.registrationForm = this.formBuilder.group({
      name: [''],
      userName: [''],
      email: [''],
      passwordHash: [''],
    });
   }

  register() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const registrationData = this.registrationForm.value;

      // Send a POST request to your backend for registration
      this.http
        .post('http://localhost:8062/auth/signup', registrationData)
        .subscribe({
          next: (value) => {},
          error: (e) => {
            console.log(e);
          },
          complete: () => {
            console.log('Signup successfull');
          },
        });
    }
  }

  gotoVendorLogin(){
    this.router.navigate(['vendorlogin'])

  }

  gotoAdminLogin(){
    this.router.navigate([''])
  }

  
  
  
  
  
 

  
}
