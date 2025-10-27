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


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),

    // ✅ Enregistrement du Store global
    provideStore(reducers),

    // ✅ (optionnel) Enregistrement des effets — vide pour l’instant
    provideEffects([]),

    // ✅ Activation des DevTools (pour suivre les actions NgRx dans le navigateur)
    // provideStoreDevtools({
    //   maxAge: 25,
    //   logOnly: environment.production, // logs limités en mode prod
    // }),
  ],
}).catch(err => console.error(err));
