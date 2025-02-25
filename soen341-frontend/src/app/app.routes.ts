import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
// import {RegisterComponent} from './pages/register/register.component';
// import {authGuard} from './services/guard/auth.guard';
// import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';

import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'testing/dm', component: DirectMessagesComponent},
    {path:'home',component:HomeComponent},
  {
    path: 'login',
    component: LoginComponent
  }
//  {
//    path: 'register',
//    component: RegisterComponent
//  },
//  {
//    path: 'activate-account',
//    component: ActivateAccountComponent
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }