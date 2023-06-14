import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
scroll(arg0: string) {
throw new Error('Method not implemented.');
}
  isAuthenticated : boolean = false;

  constructor(private  oidcSecurityService: OidcSecurityService,private commonService : CommonService){

  }
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated})=>{
      this.isAuthenticated = isAuthenticated
    })
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    //will log off and clear the tokens
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) =>{
        //info
        this.commonService.showAlert("User Logged Out", 'info');
    })
  }

}
