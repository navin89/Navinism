import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(()=> {
    if('serviceWorker' in navigator && environment.production) {
      window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('/ngsw-worker.js')
          .then(() => {
              console.log('ServiceWorker registration SUCCESSFUL');
            })
              .catch(err => {
                console.log('ServiceWorker registration failed', err);
              })
      })
    }
  })
  .catch(err => console.error(err));


