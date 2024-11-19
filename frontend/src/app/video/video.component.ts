import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent implements OnInit {
  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  videoId: string;
  videoUrl: SafeResourceUrl;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((route) => {
      this.videoId = route['id'];
    });
    console.log(this.videoId);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}?autoplay=1`
    );
  }
  goBack() {
    this.location.back();
  }
}
