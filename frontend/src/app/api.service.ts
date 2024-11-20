import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  base_url = 'http://localhost:4000/';

  postLogin(data: { email: string; password: string }) {
    return this.http.post(`${this.base_url}user/postLogin`, data);
  }
  postSignup(data: { email: string; password: string; username: string }) {
    return this.http.post(`${this.base_url}user/postSignup`, data);
  }

  // tmdb request header
  headers = new HttpHeaders({
    accept: 'application/json',
    Authorization:environment.tmdb_auth,
  });

  // get trending all
  getTrendingAll() {
    return this.http.get(
      `${environment.tmdb_base_url}/trending/all/day?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  // upcomming all
  getUpcommingAll() {
    return this.http.get(
      `${environment.tmdb_base_url}/movie/upcoming?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  // all movies
  getAllMovies() {
    return this.http.get(
      `${environment.tmdb_base_url}/trending/movie/week?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  // all shows
  getAllShows() {
    return this.http.get(
      `${environment.tmdb_base_url}/trending/tv/week?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }

  //get all movie/show
  getAllMedia(media: string, p: number = 1, lang: string = 'en') {
    // &sort_by=vote_count.desc
    return this.http.get(
      `${environment.tmdb_base_url}/discover/${media}?page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
      {
        headers: this.headers,
      }
    );
  }
  getAllMediaByGenresAndLanguage(
    media: string,
    g: number,
    p: number = 1,
    lang: string = 'en'
  ) {
    if (g) {
      return this.http.get(
        `${environment.tmdb_base_url}/discover/${media}?with_genres=${g}&page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
        {
          headers: this.headers,
        }
      );
    }
    else {
      return this.http.get(
        `${environment.tmdb_base_url}/discover/${media}?page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
        {
          headers: this.headers,
        }
      );
    }
  }
  //get genres of movie/show
  getGenres(media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/genre/${media}/list?language=en`,
      {
        headers: this.headers,
      }
    );
  }
  //get movie/show
  getMedia(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  getActors(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/credits?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  getVideos(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/videos?language=en-US`,
      {
        headers: this.headers,
      }
    );
  }
  getRecommentations(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/recommendations?language=en-US&page=1`,
      {
        headers: this.headers,
      }
    );
  }
}
