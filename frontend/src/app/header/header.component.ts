import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
   
  }
   ngOnInit(): void {
  //  console.log(this.router.url);
   }
  
  logOut() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('media_type');
    localStorage.removeItem('language');
    this.router.navigateByUrl('/');
  }
}
