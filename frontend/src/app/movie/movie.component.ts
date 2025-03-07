import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { LoadingComponent } from '../loading/loading.component';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit{
  constructor(
    private Active: ActivatedRoute,
    private apiService: ApiService,
    private route: Router
  ) {
    Active.params.subscribe(() => {
      this.Active.params.subscribe((data) => {
        this.id = data['id'];
        this.media = data['media'];
      });

      this.apiService.getMedia(this.id, this.media).subscribe((data: any) => {
        this.content = data;
      });
      this.apiService.getActors(this.id, this.media).subscribe((data: any) => {
        this.actors = data.cast;
      });

      this.apiService.getVideos(this.id, this.media).subscribe((data: any) => {
        this.videos = data.results;
      });
      this.apiService
        .getRecommentations(this.id, this.media)
        .subscribe((data: any) => {
          this.recommentations = data.results;
        });
    });
  }


  ngOnInit(): void {
    window.scrollTo(0,0)
  }
  imageurl = environment.tmdb_base_image_url;
  videourl1 =environment.tmdb_base_video_url1;
  videourl2 =environment.tmdb_base_video_url2;
  content: any;
  actors: any;
  id: number;
  media: string;
  videos: any;
  recommentations: any;

  playVideo(id: string) {
    this.route.navigateByUrl(`user/play/${id}`);
  }
  playTrailer() {
    const id = this.videos[0].key;
    this.route.navigateByUrl(`user/play/${id}`);
  }
  getMovie(media: string, id: string) {
    const params = `${media}/${id}`;
    this.route.navigateByUrl(`user/view-details/${params}`);
  }
}
