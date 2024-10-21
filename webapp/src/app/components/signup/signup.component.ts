import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorDataService } from 'src/app/services/vendor-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private formBuilder: FormBuilder, private vendor: VendorDataService, private snackbar:MatSnackBar) { }

  public registerForm!: FormGroup;
  isChecked: boolean = false;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: 2,
      name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
      email: ['', Validators.email],
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required]
    })
  }
  valueSet(){
    this.isChecked=!this.isChecked;
  }

  gotoLogin() {
    this.router.navigate(['login'])
  }

  signup() {
    if (this.registerForm.value.role === 1) {
      this.registerForm.patchValue({ role: 'vendor' });
    }
    else if (this.registerForm.value.role === 2) {
      this.registerForm.patchValue({ role: 'user' });
    }
    else {
      this.registerForm.patchValue({ role: 'admin' });
    }

    this.vendor.signup(this.registerForm.value).subscribe({
      next: (v) => { },
      error: (e) => { 
        if(e.error.length>18){
          e.error='Something went wrong';
        }
        this.snackbar.open(e.error,'Close') },
      complete: () => {
        this.router.navigate(['login'])
      }
    })
  }
}
