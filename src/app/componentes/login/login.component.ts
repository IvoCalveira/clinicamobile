import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class LoginComponent  implements OnInit {

  public usuario: Usuario = { id_usuario:0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0  };
  public data: Usuario = { id_usuario:0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), user: '', password: '', tipo_usuario: 0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0  };
  public usuarioLocal: Usuario[] = [];
  public loading: boolean = false;

  constructor(private route: Router, private usuarioservices: UsuarioService) {

    if (this.usuarioservices.estoyLogueado()) {
      route.navigateByUrl('/error');
    }
  }
  public login() {


    this.usuarioservices.loginEnApi(this.usuario).subscribe(
      x => {

        if (x == null) {
          alert("Usuario o Contraseña incorrecto, intente de nuevo");
        }
        else{
          var decode = jwtDecode<any>(x.toString());
          if (decode.data.user !=null) { 
        



          if(decode.data.autorizado == false){ //Si el usuario no esta habilitado, no se loguea
            alert("Su usuario aun no esta habilitado. Por favor contactarse con un administrador");
          } else {
            localStorage.setItem("UsuarioToken",x.toString());;
            
            //this.usuarioservices.setLogueadoXApi(<Usuario>x);
            this.usuarioservices.setLogueado();
            // localStorage.setItem('usuarioLocal', JSON.stringify(<Usuario>x));
            this.route.navigateByUrl('/principal');
          }

          //Guardamos en el local storage el usuario logueado
        }

            }  
            }  
            )
    this.usuarioservices.estoyLogueado();
  }
  ngOnInit() {}

}
