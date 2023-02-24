import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../service/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent {


  videoId !: string;
  videoUrl !: string;
  videoAvailable : boolean = false;
  videoTitle !: string;
  tags : Array<string> = [];
  videDescription !: string;
  constructor(private activatedRoute: ActivatedRoute, private videoService : VideoService){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe( data =>{
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videDescription = data.description;
      this.tags = data.tags; 
      this.videoAvailable = true;
    });
  }
}
