import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-auth',
  templateUrl: './vendor-auth.component.html',
  styleUrls: ['./vendor-auth.component.css']
})
export class VendorAuthLoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({}); //Define form group

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    //login -
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required],
    });
  }
  //Now for login
    login() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      // Send the login data to your backend for authentication
      this.http
        .post('http://localhost:XYZGSDJHSDBJBDSKJ/auth-VENDOR/logiN', userData, {
          responseType: 'text',
        })
        .subscribe({
          next: (v) => {
            const temp=v.split(" ");
            const token=temp[0];
            const username=temp[1];
            localStorage.setItem('token', token);
            localStorage.setItem('username',username);
          },
          error: (e) => {
            console.log('Failed');
          },
          complete: () => {
            console.log('done'), this.router.navigate(['userlogin']);
          },
        });
    }
  
  
  }


  gotoVendorSignUp(){
    this.router.navigate(['vendorsignup'])
  }

  gotoUserLogin()
  {this.router.navigate(['userlogin'])
  }
  
  gotoAdminLogin()
  {
    this.router.navigate([''])
  }


}
