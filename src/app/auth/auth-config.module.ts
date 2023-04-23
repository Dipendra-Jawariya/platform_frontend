import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            // authority: 'https://dev-sl65xk1wnvz766og.us.auth0.com', // djawariya1202@gmail.com active
            authority: 'https://dipendra.us.auth0.com', // dipendrajawariya20@gmail.com active
            redirectUrl: window.location.origin,
            // clientId: 'Ci4Dr9GSNuaADsf3Xxvr9oax2za5FZPr',  // djawariya1202@gmail.com active
            clientId: 'Zj88zKa5gbl739DvIiDsV7FqnjE4yVKl',// dipendrajawariya20@gmail.com active
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            // secureRoutes :['http://localhost:8080/'], //securing routes
            // customParamsAuthRequest : {
            //     audience : 'http://localhost:8080/',
            // }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
