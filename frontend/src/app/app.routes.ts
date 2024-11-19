import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MovieComponent } from './movie/movie.component';
import { VideoComponent } from './video/video.component';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { authGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  {
    path: 'user',
    component: HeaderComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'videos/:id',
        component: AllmoviesComponent,
      },
      {
        path: 'view-details/:media/:id',
        component: MovieComponent,
      },
      {
        path: 'play/:id',
        component: VideoComponent,
      },
    ],
  },
  { path: '**', component: PagenotfoundComponent },
];
