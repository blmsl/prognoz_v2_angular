import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
//import 'rxjs/add/operator/map'; //added because function map doesnt work in component news
import 'rxjs/add/operator/toPromise';//added because function toPromose doesnt work in news service
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
