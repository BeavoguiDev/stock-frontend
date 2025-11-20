import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './app/services/auth.interceptor';

// ✅ Import NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './app/store/auth'; 
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    // ✅ Un seul provideHttpClient avec l’interceptor
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(), 
    provideToastr({
      positionClass: 'toast-center',
      timeOut: 3000,
      preventDuplicates: true,
    }),
    provideStore(reducers),
    provideEffects([]),
    provideStoreDevtools(), // tu peux garder pour debug
  ],
}).catch(err => console.error(err));
