import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../service/video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../service/common.service';
import { BackendResponse } from '../common-models/response';


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

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];


  constructor(private activatedRoute : ActivatedRoute,private videoService : VideoService,private _snackBar: MatSnackBar
    ,private commonService : CommonService){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
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
  }

  onUpload(){
    
    this.videoService.uploadThumbnail(this.selectedFile,this.videoId).subscribe( (data ) =>{
      console.log(data);
      //show a upload success notification
      // this._snackBar.open("Thumbnail Upload Successful", "OK");
      this.commonService.showAlert("Thumbnail Upload Successful", 'success');
    })
  }

}
