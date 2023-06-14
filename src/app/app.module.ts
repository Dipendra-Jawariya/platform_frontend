import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent  } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AuthConfigModule } from './auth/auth-config.module';
import {AuthInterceptor} from './interceptor/auth.interceptor';

import { VideoDetailComponent } from './video-detail/video-detail.component';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { AuthModule } from 'angular-auth-oidc-client';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL, velocity: 0.1 },
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}

@Injectable()
export class CorsInterceptor implements HttpInterceptor {

constructor() {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  req.headers.append('Access-Control-Allow-Origin', '*');
  req.headers.append('Access-Control-Allow-Methods', 'GET, POST');
  return next.handle(req);
}

}


@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    SaveVideoDetailsComponent,
    VideoPlayerComponent,
    VideoDetailComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    AuthConfigModule,
    AuthModule,
    HttpClientModule,
  ],
 providers: [ToastrService,
    AuthService ,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass :AuthInterceptor ,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
