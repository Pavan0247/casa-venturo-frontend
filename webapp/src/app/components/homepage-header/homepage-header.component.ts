import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.css']
})
export class HomepageHeaderComponent {

  constructor(private router:Router){}
  goto(){
    this.router.navigate(['login'])
  }
}
