import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit{

  @Input()
  videoUrl !: string | '';
  constructor(){

  }
  ngOnInit(): void {
    console.log(this.videoUrl);
    
  }
  
}
