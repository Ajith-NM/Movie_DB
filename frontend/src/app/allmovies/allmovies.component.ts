import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { ApiService } from '../api.service';
import { TmdbService } from '../tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { browserRefresh } from '../app.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-allmovies',
  standalone: true,
  imports: [FilterComponent, LoadingComponent],
  templateUrl: './allmovies.component.html',
  styleUrl: './allmovies.component.css',
})
export class AllmoviesComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private tmdb: TmdbService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((data) => {
      if (
        localStorage.getItem('media_type') === data['id'] &&
        !browserRefresh
      ) {
        this.language_code = localStorage.getItem('language') || 'en';
      } else {
        this.language_code = 'en';
      }

      this.media_type = data['id'];
      localStorage.setItem('media_type', data['id']);
      this.apiService
        .getAllMedia(data['id'], 1, this.language_code)
        .subscribe((data) => {
          this.tmdb.updateAllMedia(data);
        });
    });
  }

  allMedia: any[];
  media_type: string = '';
  page: number = 1;
  genres_type: number = 0;
  language_code: string = 'en';
  imageurl = environment.tmdb_base_image_url;
  ngOnInit(): void {
    this.tmdb.getMedia.subscribe((data) => {
      console.log(data.results);
      // this.language_code = 'en';
      this.allMedia = data.results;
    });
    console.log(this.language_code);
  }

  getMovie(M_id: string) {
    const params = `${this.media_type}/${M_id}`;
    this.route.navigateByUrl(`user/view-details/${params}`);
  }
  genres(value: number) {
    this.genres_type = value;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        value,
        this.page,
        this.language_code
      )
      .subscribe((data) => {
        this.tmdb.updateAllMedia(data);
      });
  }

  language(value: string) {
    this.language_code = value;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        this.genres_type,
        this.page,
        this.language_code
      )
      .subscribe((data) => {
        this.tmdb.updateAllMedia(data);
      });
  }

  loadMore() {
    this.page++;
    if (this.genres_type) {
      this.apiService
        .getAllMediaByGenresAndLanguage(
          this.media_type,
          this.genres_type,
          this.page,
          this.language_code
        )
        .subscribe((data: any) => {
          this.allMedia = [...this.allMedia, ...data.results];
        });
    } else {
      this.apiService
        .getAllMedia(this.media_type, this.page, this.language_code)
        .subscribe((data: any) => {
          this.allMedia = [...this.allMedia, ...data.results];
        });
    }
  }
}
