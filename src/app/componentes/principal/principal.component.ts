import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class PrincipalComponent  implements OnInit {
  public listaUsuario: Usuario[] = [];
  private route: Router = new Router;
  public estaLogueado: boolean = false;
  public usuario:Usuario = {id_usuario:0, nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date(), dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0 };

  constructor(public router:Router, public usuarioservices: UsuarioService) {



    if (this.usuarioservices.usuarioLogueado.user != '') {
      this.estaLogueado = true;
      this.usuarioservices.estoyLogueado();
      this.usuario = this.usuarioservices.usuarioLogueado; // Aquí asignamos el usuario logueado
      console.log('Tipo de usuario:', this.usuario.tipo_usuario);



    //Si hay, se guarda en listaUsuario el usuario que este logueado desde el LocalStorage
    // this.listaUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '[]');

    //Verifico si hay un usuario logueado
    //if(this.listaUsuario.length>0)
    //  this.estaLogueado=true;
  }
}
  public logout() {
    //Vaciar el local storage de la sesion iniciada
    localStorage.removeItem('UsuarioToken');


    this.listaUsuario = [];
    this.usuarioservices.usuarioLogueado = { nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true };
    this.estaLogueado = false;

    this.route.navigateByUrl('/login');

  }
  ngOnInit() {}
  
}
