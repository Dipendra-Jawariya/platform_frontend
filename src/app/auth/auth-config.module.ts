import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-sl65xk1wnvz766og.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: '58Tjj7yLU8oZ2QFMfahiMJBflEalAyir',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes :['http://localhost:8080/'], //securing routes
            customParamsAuthRequest : {
                audience : 'http:/localhost:8080/',
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
