import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string | undefined;


  constructor(private authService: AuthService, private oidcSecurityService: OidcSecurityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = this.authService.getToken();
    this.oidcSecurityService.getIdToken().subscribe((data) => {
      this.token = data;
      console.log(this.token);
    })

    
    const cloned = request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + this.token)
    });
    return next.handle(cloned);
  }
}
