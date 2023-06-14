import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'video-streaming_frontend';
  token: string | undefined;

  constructor(private oidcSecurityService : OidcSecurityService,private commonService: CommonService){
  }
  ngOnInit(): void {
    
    
    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
    //   // if(isAuthenticated) {
    //   //   this.commonService.showAlert("app is authenticated", 'success');
    //   // }
    //   console.log('app is authenticated', isAuthenticated);
    // });
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated)=>{
      console.log('app is authenticated', isAuthenticated);
      
    })
  }
 
}
