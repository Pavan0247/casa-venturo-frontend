import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private vendorData: VendorDataService,
    private userData: UserDataService,
    private snackbar: MatSnackBar,
  ) { }

  public loginForm!: FormGroup;
  public role: any;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      role: 2,
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required]
    })
  }

  gotoForgotPass() {
    this.router.navigate(['forgot-password']) 
  }

  gotoSignup() {
    this.router.navigate(['signup'])
  }

  login() {
    if (this.loginForm.value.role === 1) {
      this.loginForm.patchValue({ role: 'vendor' });
    }
    else if (this.loginForm.value.role === 2) {
      this.loginForm.patchValue({ role: 'user' });
    }
    else if (this.loginForm.value.role === 3) {
      this.loginForm.patchValue({ role: 'admin' });
    }
    localStorage.setItem('role', this.loginForm.value.role);
    this.role = localStorage.getItem('role');

    this.vendorData.login(this.loginForm.value).subscribe({
      next: (v) => {
        const temp = v.split(" ");
        const token = temp[0];
        const username = temp[1];
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('email', this.loginForm.value.email)

        const headers = new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        this.userData.firstLogin(this.loginForm.value.email, headers).subscribe({
          next: (v) => {
            localStorage.setItem('secondLogin', v.firstLoginDone)
          },
          error: (e) => {
          },
          complete: () => {
          }
        })


        if (this.loginForm.value.role === 'vendor') {
          this.router.navigate(['landing', 'vendor']);
        } else if (this.loginForm.value.role === 'user') {
          this.router.navigate(['landing', 'user']);
        } else if (this.loginForm.value.role === 'admin') {
          this.router.navigate(['admin', 'dashboard'])
        } else {
          this.router.navigate([''])
          this.snackbar.open('Something went wrong', 'Close');
        }
      },
      error: (e) => {
        this.snackbar.open("Something went wrong", 'Close');
        this.loginForm.reset();
      },
      complete: () => {
        this.loginForm.reset();
      }
    });
  }
}
