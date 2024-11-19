import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TmdbService } from '../tmdb.service';
import { tmdb_base_image_url } from '../constants/tmdb_constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private apiService: ApiService, private tmdb: TmdbService,private route:Router) { }
  
  trendingAll: any[]
  upcomming: any[]
  movies: any[]
  tvShows:any[]
   imageurl=tmdb_base_image_url
  ngOnInit(): void {
   
    this.tmdb.getTrending.subscribe((data) => {
       this.trendingAll = data.results;
    });

     this.tmdb.getUpcomming.subscribe((data) => {
       this.upcomming = data.results;
     });
    
     this.tmdb.getMovies.subscribe((data) => {
       this.movies = data.results;
     });
    
     this.tmdb.getShows.subscribe((data) => {
       this.tvShows = data.results;
     });

    this.apiService.getTrendingAll().subscribe((data) => {
      this.tmdb.updateTrending(data);
    })
    
     this.apiService.getUpcommingAll().subscribe((data) => {
       this.tmdb.updateUpcomming(data);
      
     });
    
     this.apiService.getAllMovies().subscribe((data) => {
       this.tmdb.updateMovies(data);
     });
    
     this.apiService.getAllShows().subscribe((data) => {
       this.tmdb.updateShows(data);
     });
 }
  getMovie(media: string, id: string) {
  const params=`${media}/${id}`
    this.route.navigateByUrl(`/user/view-details/${params}`);
  }
  
}
