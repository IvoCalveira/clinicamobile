import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ForoComponent } from './componentes/foro/foro.component';

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
];
