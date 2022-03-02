import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'hammerjs';



import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//import Amplify from 'aws-amplify';
//import awsconfig from './aws-exports';
//Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}





platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if (environment.platform === 'pwa'){
    if (environment.production && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(active =>
        !active && navigator.serviceWorker.register('/ngsw-worker.js')).catch(console.error);
    }
  }
}).catch(err => console.log(err));   
