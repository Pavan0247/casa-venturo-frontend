import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendor-auth-signup',
  templateUrl: './vendor-auth-signup.component.html',
  styleUrls: ['./vendor-auth-signup.component.css']
})
export class VendorAuthSignUpComponent {
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
        .post('http://localhost:VENDORSIGNUP/VENDOR/JSDBWBNDNLNWNLDWS/signup', registrationData)
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
  gotoUserLogin(){this.router.navigate(['userlogin'])}
  gotoAdminLogin(){this.router.navigate([''])}
 
}
