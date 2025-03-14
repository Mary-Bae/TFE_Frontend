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
        audience: 'https://FlexiTimeAPI'
      },
      httpInterceptor:{
        allowedList:[
          {
            uri: 'https://localhost:7290/api/*',
            uriMatcher:(uri)=>{
              return uri != 'https://localhost:7290/api/Demandes/GetPublic'
            },
            tokenOptions:{
              authorizationParams:{
                audience: 'https://FlexiTimeAPI'
              }
            }
          }
        ]
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn]))
  ]
};
