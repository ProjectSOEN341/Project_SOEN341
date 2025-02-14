import { Routes } from '@angular/router';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { AppComponent } from './app.component';

export const routes: Routes = [{path: '', component: AppComponent},{path: 'testing/dm', component: DirectMessagesComponent}];
