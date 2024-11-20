import { Component } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent{
  constructor(private router: Router,) {
   
  }
  
  
  logOut() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('media_type');
    localStorage.removeItem('language');
    this.router.navigateByUrl('/');
  }
}
