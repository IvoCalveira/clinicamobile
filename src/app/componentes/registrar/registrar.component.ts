import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule, IonicModule],
  standalone: true,
})
export class RegistrarComponent  implements OnInit {

  listaUsuarios:Usuario[] = [];
  public usuario:Usuario = {id_usuario:0, nombre:'', password:'', apellido:'', user:'', mail:'', tipo_usuario:0, nacimiento: new Date(), dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0 };
  public password2:string='';
  i: any;

  constructor(public router:Router, private us:UsuarioService) {
    //this.listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
  }

  diasSeleccionados: boolean[] = Array(5).fill(false);

  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];


  booleanoDias(index: number, event: any) {
    this.diasSeleccionados[index] = event.target.checked;
    this.cargarDias();
  }

  cargarDias() {
    return this.usuario.dias_habiles = this.diasSeleccionados.filter((dia, index) => this.diasSeleccionados[index]);
  }
  

  validarExiste(){
     return this.listaUsuarios.filter(
       t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase()).length == 1;
  }

  base64(event: Event, tipo: 'foto_especialidad' | 'foto_perfil') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {  
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const result = e.target?.result as string;
                    if (tipo === 'foto_especialidad') {
                        this.usuario.foto_especialidad = result;
                    } else if (tipo === 'foto_perfil') {
                        this.usuario.foto_perfil = result;
                    }
                };
                reader.readAsDataURL(file);
    }

}

    // public registrar(){
    //   this.listaUsuarios.push(this.usuario);
    //   localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
    //   this.listaUsuarios = JSON.parse(JSON.stringify(this.listaUsuarios));
    //   this.router.navigateByUrl('/login');
    // }
    public registrarEnApi(){
      if(this.usuario.tipo_usuario == 2 || 3){
        this.usuario.autorizado = false;
      }
      this.us.registrar(this.usuario).subscribe(
        x => {
                console.log(x);
                //this.us.setLogueadoXApi(<Usuario>x)
                this.router.navigateByUrl('/login')
          }
          
      );
      this.router.navigateByUrl('/login')
    }

    ngOnInit() {}

}
