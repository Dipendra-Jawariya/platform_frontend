import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from '../common-models/uploadVideoResponse';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient : HttpClient) { }

  uploadVideo(fileEntry :File):Observable<UploadVideoResponse>{

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)
    //post call to upload video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/video/upload",formData);

  }

  uploadThumbnail(fileEntry :File,videoId : string){

    const formData = new FormData() 
    formData.append('file', fileEntry, fileEntry.name)
    formData.append('videoId',videoId);
    //post call to upload video thumbnail
    return this.httpClient.post("http://localhost:8080/api/video/thumbnail",formData, {
      responseType :'text'
    });

  }
}
