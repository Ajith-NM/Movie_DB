import { Component } from '@angular/core';
import { Router, RouterOutlet,NavigationStart } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './video/video.component';
import { Subscription } from 'rxjs';
import { LoadingComponent } from './loading/loading.component';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  subscription: Subscription;
  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
