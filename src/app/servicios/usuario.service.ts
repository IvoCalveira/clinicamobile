import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private APIURL:string =  "https://calveira-clinicaapi.mdbgo.io";

  constructor(public http:HttpClient ) {
    //this.listaUsuario = JSON.parse(localStorage.getItem('usuario') || '[]');
     this.setLogueado();
  }
  public usuarioLogueado: Usuario = { id_usuario:0, nombre: '', password: '', mail: '', user:'', apellido: '', nacimiento: new Date(), tipo_usuario:0, dias_habiles:[], especialidad:'', foto_especialidad:'', foto_perfil:'', horario_desde:0, horario_hasta:0, autorizado:true, id_medico:0 };

  public listaUsuario: Usuario[] = [];

  public decode: any;
  

  public loginEnApi(usuario:Usuario){
    return this.http.post(this.APIURL  + "/login",usuario);
  }

  public estoyLogueado() :boolean{
    return this.usuarioLogueado.user != '';
  }

  public setLogueado(){
    if (localStorage.getItem('UsuarioToken') ?? '' != ''){
      this.decode = jwtDecode<any>(localStorage.getItem('UsuarioToken') ?? '');

    this.usuarioLogueado = this.decode.data;
    }
  }

}
