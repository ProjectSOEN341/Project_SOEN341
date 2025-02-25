
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
// import {HttpTokenInterceptor} from './services/interceptor/http-token.interceptor';
// import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
// import {CodeInputModule} from 'angular-code-input';
// import {KeycloakService} from './services/keycloak/keycloak.service';

// export function kcFactory(kcService: KeycloakService) {
//  return () => kcService.init();
// }

bootstrapApplication(AppComponent);

@NgModule({
  declarations: [
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
        ],
  providers: [
    HttpClient
  ]
})
export class AppModule { }
