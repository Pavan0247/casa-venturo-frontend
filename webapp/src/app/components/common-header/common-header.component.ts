import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css']
})
export class CommonHeaderComponent {
  constructor(private router: Router,
    private searchService: SearchService,
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
