import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

// ✅ Import NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './app/store/auth'; // ton index.ts du dossier store
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // animations nécessaires pour les toasts
    provideToastr({
      positionClass: 'toast-center', // classe CSS personnalisée
      timeOut: 3000,
      preventDuplicates: true,
    }),
    provideStore(reducers),
    provideEffects([]),
  ],
}).catch(err => console.error(err));

