import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

const routes: Routes = [
  {
    path:'upload-video',
    component : UploadVideoComponent,
  },{
    path :'save-video-details/:videoId' ,
    component : SaveVideoDetailsComponent
  },{
    path :'video-details/:videoId' ,
    component : VideoDetailComponent
  }, {
    path: 'landing',
    component: HeaderComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
