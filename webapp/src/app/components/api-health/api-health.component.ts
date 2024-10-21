import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-health',
  templateUrl: './api-health.component.html',
  styleUrls: ['./api-health.component.css']
})
export class ApiHealthComponent {
  constructor(private router: Router) { }
  changeView() {
    this.router.navigate(['admin', 'dashboard'])
  }

  changeView1() {
    this.router.navigate(['admin', 'api-health'])
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
