import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../service/video.service';
import { CommonService } from '../service/common.service';
import { VideoDto } from '../common-models/video-dto';


@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.scss']
})
export class SaveVideoDetailsComponent implements OnInit{
  saveVideoDetailsForm : FormGroup;
  title : FormControl = new FormControl('');
  description : FormControl = new FormControl('');
  videoStatus : FormControl = new FormControl('');
  selectedFile!: File;
  selectedFileName = ' ';
  videoId = '';
  fileSelected = false;
  videoUrl !:string; 
  thumbnailUrl !: string
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  videoAvailable : boolean = false;

  constructor(private activatedRoute : ActivatedRoute,private videoService : VideoService, private commonService : CommonService){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe( data =>{
      console.log(data);
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl  = data.thumbnailUrl;
      this.videoAvailable = true
    });
    this.saveVideoDetailsForm = new FormGroup({
      title : this.title,
      description : this.description,
      videoStatus : this.videoStatus,
    });
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tags: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tags);
      return;
    }

    // // Edit existing fruit
    // const index = this.tags.indexOf(tags);
    // if (index > 0) {
    //   this.tags[index].name = value;
    // }
  }
  onFileSelected($event : Event){
    //@ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload(){
    
    this.videoService.uploadThumbnail(this.selectedFile,this.videoId).subscribe( (data ) =>{
      console.log(data);
      //show a upload success notification
      // this._snackBar.open("Thumbnail Upload Successful", "OK");
      this.commonService.showAlert("Thumbnail Upload Successful", 'success');
    })
  }

  saveVideo(){
    //make a call to videoService to make a http call to backend
    const videoMetaData:VideoDto = {
      "id" : this.videoId,
      "title" : this.saveVideoDetailsForm.get('title')?.value,
      "description" : this.saveVideoDetailsForm.get('description')?.value,
      "tags" : this.tags,
      "videoStatus" : this.saveVideoDetailsForm.get('videoStatus')?.value,
      "videoUrl" : this.videoUrl,
      "thumbnailUrl": this.thumbnailUrl,
    }
    this.videoService.saveVideo(videoMetaData).subscribe(data => {
      this.commonService.showAlert("Video MetaData Updated Successfully", 'success');
    });
  }
  
  

}
