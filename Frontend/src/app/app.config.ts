import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAuth0, authHttpInterceptorFn} from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors} from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAuth0({
      domain : 'dev-r0omvlrob02srgfr.us.auth0.com',
      clientId : 'quhdnv5lsdrgukBLszB9tMzKU7hymnVG',
      authorizationParams : {
        redirect_uri : window.location.origin,
       
      },
      httpInterceptor : {
        allowedList : [
          {
            uri: 'http://localhost:5000/api/*',             
            uriMatcher : (uri) => { 
              // un exemple d'url qui ne demande pas un access token 
              return uri != 'http://localhost:5000/api/Values/getall' 
            }, 
            tokenOptions: { 
              authorizationParams: { 
                audience: 'https://WebApiForAngular-26-11-2024',     
              } 
            }
          }
        ]
      }
      
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn]))
  ]
};
