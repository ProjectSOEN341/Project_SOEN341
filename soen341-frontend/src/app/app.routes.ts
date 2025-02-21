import { Routes } from '@angular/router';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [{path: '', component: AppComponent},{path: 'testing/dm', component: DirectMessagesComponent}
    {path:'home',component:HomeComponent}
];
