import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from '../common-models/uploadVideoResponse';
import { VideoDto } from '../common-models/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient : HttpClient) { }

  uploadVideo(fileEntry :File):Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)
    //post call to upload video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos/upload",formData);

  }

  uploadThumbnail(fileEntry :File,videoId : string) : Observable<string>{

    const formData = new FormData() 
    formData.append('file', fileEntry, fileEntry.name)
    formData.append('videoId',videoId);
    //post call to upload video thumbnail
    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail",formData, {
      responseType :'text'
    });
  }
  getVideo(videoId : string): Observable<VideoDto>{
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/videos/" + videoId);
  }
  saveVideo(videoMetaData : VideoDto) : Observable<VideoDto>{
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/videos" , videoMetaData);
  }
}
