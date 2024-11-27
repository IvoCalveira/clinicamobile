import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent, // Página principal
  },
  {
     path: 'principal',
     component: PrincipalComponent,}
];
