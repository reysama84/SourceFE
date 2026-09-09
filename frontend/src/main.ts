import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { APP_ROUTES, SelectivePreloadStrategy } from './app/app.routes';
import { reducers, metaReducers, effects } from './app/state';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
    ),
    provideStore(reducers, metaReducers),
    provideEffects(effects),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  ],
}).catch((err) => console.error(err));
