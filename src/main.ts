import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { FormsModule  } from '@angular/forms';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/componentes/login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideRouter(routes),
    IonicModule,
    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Inicializar Firestore
    provideFirestore(() => getFirestore()),
  ],


});
