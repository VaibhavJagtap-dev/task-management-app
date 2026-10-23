import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './core/services/mock-data-service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    // Intercepts HTTP requests and routes them to our MockDataService
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(MockDataService, {
        delay: 500, // Simulates network latency (500ms)
        passThruUnknownUrl: true, // Allows real external URLs to bypass the mock interceptor
      }),
    ),
  ],
};
