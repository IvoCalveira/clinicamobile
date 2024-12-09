import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ForoComponent } from './componentes/foro/foro.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { AdministrarMedicoComponent } from './componentes/administrar-medico/administrar-medico.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'login', pathMatch:'full'// Página principal
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
     path: 'principal',
     component: PrincipalComponent,},
    {
      path: 'foro',
      component: ForoComponent, // Página del foro
    },
    {
      path: 'registrar',
      component: RegistrarComponent, 
    },
    {
      path: 'administrar-medico',
      component: AdministrarMedicoComponent, 
    },
];

export const appConfig = [
  provideRouter(routes), // Proveer rutas
  IonicModule.forRoot(), // Configuración de Ionic
  provideHttpClient(),   // Cliente HTTP para peticiones
  FormsModule,           // Para ngModel
  ReactiveFormsModule    // Para formularios reactivos
];


