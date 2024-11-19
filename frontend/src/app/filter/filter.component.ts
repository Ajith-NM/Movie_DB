import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit ,OnDestroy{
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private tmdbService: TmdbService
  ) {
     
    this.activeRoute.params.subscribe((data) => {
      this.selected_genres = 0
      if (localStorage.getItem('media_type') === data['id']) {
        this.selected_language = localStorage.getItem('language') || '';
      } else {
        this.selected_language = '';
      }
         
      this.media = data['id'];
      this.apiService.getGenres(data['id']).subscribe((data: any) => {
        tmdbService.updateGenres(data);
      });
    });
  }
  genres: any;
  media: string;

  selected_language: string=''
  selected_genres:number=0
  active:string="active"
  languages: { code: string; name: string }[] = [
    {
      code: 'ml',
      name: 'Malayalam',
    },
    {
      code: 'ta',
      name: 'Tamil',
    },
    {
      code: 'hi',
      name: 'Hindi',
    },
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ko',
      name: 'Korean',
    },
    {
      code: 'zh',
      name: 'Chinese',
    },
    {
      code: 'fr',
      name: 'French',
    },
    {
      code: 'es',
      name: 'Spanish',
    },
    {
      code: 'ru',
      name: 'Russian',
    },
    {
      code: 'ja',
      name: 'Japanese',
    },
  ];
  @Output() Genres: EventEmitter<number> = new EventEmitter<number>();
  @Output() Language: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.tmdbService.getGenres.subscribe((data) => {
        this.selected_language ='';
      
      this.genres = data.genres;
      console.log(this.genres);
    });
  }


  passGenres(value: number) {
    
    if (this.selected_genres !== value) {
      this.selected_genres = value;
      this.Genres.emit(value);
    } else {
      this.selected_genres = 0;
      this.Genres.emit(0);
    }
    

  }
  passLanguage(value: string) {
    if (this.selected_language!==value) {
      localStorage.setItem('language', value);
      this.selected_language = value;
      this.Language.emit(value);
    } else {
      localStorage.removeItem('language');
      this.selected_language = "";
      this.Language.emit("en");
    }
    
  }
  ngOnDestroy(): void {
     //  localStorage.removeItem('language');
  }
}
