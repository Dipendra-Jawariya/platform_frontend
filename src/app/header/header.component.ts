import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isAuthenticated : boolean = false;

  constructor(private  oidcSecurityService: OidcSecurityService){

  }
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated})=>{
      this.isAuthenticated = isAuthenticated
    })
  }

  // logout() {
  //   // this.router.navigate(['/auth/admin-login']);
  //   // this.authService.logout();
  // }
  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    //will log off and clear the tokens
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

}
