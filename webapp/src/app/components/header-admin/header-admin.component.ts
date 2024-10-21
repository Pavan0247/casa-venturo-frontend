import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandingVendorComponent } from '../landing-vendor/landing-vendor.component';
import { SearchService } from 'src/app/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  constructor(private router: Router,
    private snackbar: MatSnackBar,
    
  ) { }

  public username: any = localStorage.getItem('username')
  public show = true;
  public selected: string = '';

  public isVendor: boolean | undefined;

  public isProfileUpdated: boolean = false;

  ngOnInit() {

    this.isProfileUpdated = localStorage.getItem('secondLogin') ? false : true;

    if (localStorage.getItem('role') === 'admin')
      this.show = false;
    else
      this.show = true;

    if (localStorage.getItem('role') === 'vendor') {
      this.isVendor = true
    }
    else if (localStorage.getItem('role') === 'user') {
      this.isVendor = false;
    }
    else {
      this.isVendor = false;
    }
  }

  refresh() {
    (document.getElementById('search-value') as HTMLInputElement).value = ''
    this.selected = ''
  }

  search() {
    const secretInput = document.getElementById('search-value') as HTMLInputElement;
    if (secretInput.value !== null && this.selected !== '') {
      var value = secretInput.value;
    }
    else if (secretInput.value !== null && this.selected === '') {
      this.snackbar.open('Select a Filter Type to proceed', 'Close')
    }

  }

  gotoProfileUpdate() {
    this.router.navigate(['update-profile'])
  }

  gotoOrderPage() {
    if (localStorage.getItem('role') === 'vendor') {
      this.router.navigate(['bookings', 'vendor'])
    }
    if (localStorage.getItem('role') === 'user') {
      this.router.navigate(['bookings', 'user'])
    }
    return '/'
  }


  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
